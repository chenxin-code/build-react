import { useState } from 'react'
import { Tabs, Input, Button, Modal, Table, Alert, message } from 'antd'
import { SearchOutlined, LinkOutlined } from '@ant-design/icons'
import baiduNews from '../../api/baiduNews'
import taobaoSearchSuggest from '../../api/taobaoSearchSuggest'
import { debounce1, debounce2 } from '../../toolFunc'
import './TestApi.css'

function TestApi() {
  const [activeName, setActiveName] = useState('百度新闻')
  const [query, setQuery] = useState('热干面')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [jsonContent, setJsonContent] = useState('')

  const showResultDialog = (title, data) => {
    let headers = []
    let rows = []

    if (title === '百度新闻') {
      const localNews = data?.data?.LocalNews?.data
      const first = Array.isArray(localNews?.rows?.first) ? localNews.rows.first : []
      const second = Array.isArray(localNews?.rows?.second) ? localNews.rows.second : []
      const items = [...first, ...second]

      if (items.length > 0) {
        headers = [
          { key: 'title', label: '标题' },
          { key: 'time', label: '时间' },
          { key: 'url', label: '链接' },
        ]
        rows = items.map((item) => ({
          title: item.title || '',
          time: item.time || '',
          url: item.url || '',
        }))
      }
    } else if (title === '淘宝搜索提示') {
      const items = Array.isArray(data) ? data : data.result || []
      if (items.length > 0 && Array.isArray(items[0])) {
        headers = [
          { key: 'keyword', label: '搜索词' },
          { key: 'heat', label: '热度' },
        ]
        rows = items.map((item) => ({ keyword: item[0], heat: item[1] }))
      }
    }

    setTableHeaders(headers)
    setTableData(rows)
    setJsonContent(JSON.stringify(data))
    setDialogTitle(title)
    setDialogVisible(true)
  }

  const getBaiduNews = () => {
    debounce1(() => {
      baiduNews({
        method: 'get',
        url: 'widget',
        params: {
          id: 'LocalNews',
          loc: 5496,
          ajax: 'json',
        },
      })
        .then((data) => {
          showResultDialog('百度新闻', data)
        })
        .catch((err) => {
          message.error('百度新闻请求失败: ' + err.message)
        })
    })
  }

  const getTaobaoSearchSuggest = () => {
    debounce2(() => {
      if (!query || !query.trim()) {
        message.warning('请输入搜索内容')
        return
      }
      taobaoSearchSuggest({
        method: 'get',
        url: 'sug',
        params: {
          code: 'utf-8',
          q: query,
        },
      })
        .then((data) => {
          showResultDialog('淘宝搜索提示', data)
        })
        .catch((err) => {
          message.error('淘宝搜索提示请求失败: ' + err.message)
        })
    })
  }

  const columns = tableHeaders.map((col) => ({
    title: col.label,
    dataIndex: col.key,
    key: col.key,
    width: col.width,
    align: col.align || 'center',
    render:
      col.key === 'url'
        ? (text) =>
            text ? (
              <a href={text} target="_blank" rel="noreferrer">
                <LinkOutlined />
              </a>
            ) : null
        : (text) => text,
  }))

  const tabItems = [
    {
      key: '百度新闻',
      label: '百度新闻',
      children: (
        <div className="tab-pane center">
          <Button type="primary" onClick={getBaiduNews}>
            GET
          </Button>
        </div>
      ),
    },
    {
      key: '淘宝搜索提示',
      label: '淘宝搜索提示',
      children: (
        <div className="tab-pane">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="请输入内容"
            prefix={<SearchOutlined />}
            allowClear
          />
          <Button type="primary" onClick={getTaobaoSearchSuggest}>
            GET
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="test-api">
      <Tabs
        activeKey={activeName}
        onChange={setActiveName}
        type="card"
        items={tabItems}
      />
      <Modal
        className="test-api-modal"
        title={dialogTitle}
        open={dialogVisible}
        onCancel={() => setDialogVisible(false)}
        width="50%"
        style={{ top: '5vh' }}
        footer={
          <Button onClick={() => setDialogVisible(false)}>关 闭</Button>
        }
      >
        <div className="dialog-stats">
          共 <strong>{tableData.length}</strong> 条数据
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey={(record, index) => index}
          bordered
          pagination={false}
          scroll={{ y: 400 }}
          rowClassName={(_, index) => (index % 2 === 1 ? 'stripe-row' : '')}
        />
        <div className="json-container">
          <Alert type="success" message={jsonContent} />
        </div>
      </Modal>
    </div>
  )
}

export default TestApi
