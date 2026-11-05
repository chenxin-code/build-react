import { useState, useEffect } from 'react'
import { Button, Input, Modal, Table, Alert } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import './BatchCreatePlan.css'

const lineData = ['产品线1', '产品线2', '产品线3', '产品线4', '产品线5']
const products = ['A', 'B', 'C', 'D', 'E', 'F']

const columns = [
  { title: '产品', dataIndex: 'product', key: 'product', width: 80, align: 'center' },
  { title: '产品线', dataIndex: 'line', key: 'line', width: 100, align: 'center' },
  { title: '时间', dataIndex: 'timeText', key: 'timeText', width: 120, align: 'center' },
  { title: '内容', dataIndex: 'content', key: 'content' },
]

function BatchCreatePlan() {
  const [rowData, setRowData] = useState([])
  const [submitArr, setSubmitArr] = useState([])
  const [yearCount, setYearCount] = useState(1)
  const [dialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    const colData = lineData.map((item) => ({ line: item, content: null }))
    const data = products.map((item) => ({
      product: item,
      time: 1,
      colData: _.cloneDeep(colData),
    }))
    setRowData(data)
  }, [])

  const updateTime = (rowIndex, time) => {
    setRowData((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, time } : row)),
    )
  }

  const updateContent = (rowIndex, colIndex, content) => {
    setRowData((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              colData: row.colData.map((col, j) =>
                j === colIndex ? { ...col, content } : col,
              ),
            }
          : row,
      ),
    )
  }

  const submit = () => {
    const result = []
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    rowData.forEach((item1) => {
      item1.colData.forEach((item2) => {
        if (item2.content) {
          if (item1.time === 3) {
            for (let i = 1; i <= yearCount; i++) {
              result.push({
                product: item1.product,
                line: item2.line,
                content: item2.content,
                year: currentYear + i,
                timeText: `${currentYear + i}年`,
              })
            }
          } else if (item1.time === 2) {
            const currentQuarter = Math.ceil(currentMonth / 3)
            for (let quarter = currentQuarter + 1; quarter <= 4; quarter++) {
              result.push({
                product: item1.product,
                line: item2.line,
                content: item2.content,
                year: currentYear,
                quarter,
                timeText: `${currentYear}年Q${quarter}`,
              })
            }
            for (let i = 1; i <= yearCount; i++) {
              [1, 2, 3, 4].forEach((quarter) => {
                result.push({
                  product: item1.product,
                  line: item2.line,
                  content: item2.content,
                  year: currentYear + i,
                  quarter,
                  timeText: `${currentYear + i}年Q${quarter}`,
                })
              })
            }
          } else if (item1.time === 1) {
            for (let month = currentMonth + 1; month <= 12; month++) {
              result.push({
                product: item1.product,
                line: item2.line,
                content: item2.content,
                year: currentYear,
                month,
                timeText: `${currentYear}年${month}月`,
              })
            }
            for (let i = 1; i <= yearCount; i++) {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((month) => {
                result.push({
                  product: item1.product,
                  line: item2.line,
                  content: item2.content,
                  year: currentYear + i,
                  month,
                  timeText: `${currentYear + i}年${month}月`,
                })
              })
            }
          }
        }
      })
    })

    setSubmitArr(result)
    setDialogVisible(true)
  }

  return (
    <div className="container">
      <div className="year-selector">
        <Button.Group>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button
              key={n}
              type={yearCount === n ? 'primary' : 'default'}
              size="small"
              onClick={() => setYearCount(n)}
            >
              未来{n}年
            </Button>
          ))}
        </Button.Group>
      </div>
      <div className="table-wrapper">
        <div className="row header-row">
          <div className="col header-col label-col">产品</div>
          <div className="col header-col time-col">时间</div>
          {lineData.map((item, index) => (
            <div className="col header-col input-col" key={index}>
              {item}
            </div>
          ))}
        </div>
        {rowData.map((row, rowIndex) => (
          <div className="row data-row" key={rowIndex}>
            <div className="col label-col">{row.product}</div>
            <div className="col time-col">
              <Button.Group className="time-btn-group">
                <Button
                  type={row.time === 1 ? 'primary' : 'default'}
                  size="small"
                  onClick={() => updateTime(rowIndex, 1)}
                >
                  每月
                </Button>
                <Button
                  type={row.time === 2 ? 'primary' : 'default'}
                  size="small"
                  onClick={() => updateTime(rowIndex, 2)}
                >
                  每季
                </Button>
                <Button
                  type={row.time === 3 ? 'primary' : 'default'}
                  size="small"
                  onClick={() => updateTime(rowIndex, 3)}
                >
                  每年
                </Button>
              </Button.Group>
            </div>
            {row.colData.map((col, colIndex) => (
              <div className="col input-col" key={colIndex}>
                <Input
                  value={col.content || ''}
                  onChange={(e) =>
                    updateContent(rowIndex, colIndex, e.target.value)
                  }
                  allowClear
                  size="small"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginTop: 16 }}
        onClick={submit}
      >
        批量创建计划
      </Button>
      <Modal
        title="批量创建计划预览"
        open={dialogVisible}
        onCancel={() => setDialogVisible(false)}
        width="70%"
        footer={
          <Button onClick={() => setDialogVisible(false)}>关 闭</Button>
        }
        className="center-dialog"
      >
        <div className="dialog-stats">
          共 <strong>{submitArr.length}</strong> 个计划
        </div>
        <div className="table-container">
          <Table
            dataSource={submitArr}
            columns={columns}
            bordered
            stripe
            pagination={false}
            scroll={{ y: 400 }}
            rowKey={(record, index) => index}
          />
        </div>
        <div className="json-container">
          <Alert
            description={JSON.stringify(submitArr)}
            type="success"
            showIcon={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default BatchCreatePlan
