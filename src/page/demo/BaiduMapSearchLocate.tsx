import { useState, useRef, useCallback } from 'react'
import { AutoComplete, Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import baiduMap from '../../api/baiduMap'
import BaiduMapDialog from '../../component/BaiduMap'

interface SuggestionItem {
  value: string
}

function BaiduMapSearchLocate() {
  const [address, setAddress] = useState('')
  const [options, setOptions] = useState<SuggestionItem[]>([])
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef<{ initMap: (addr: string) => void }>(null)

  const fetchSuggestions = useCallback((queryString: string) => {
    if (!queryString) {
      setOptions([])
      return
    }
    baiduMap
      .get('/su?cid=&type=0', { params: { wd: queryString } })
      .then((resp: any) => {
        const list: SuggestionItem[] = resp.s.map((item: string) => {
          const arr = item.split('$')
          return { value: arr[0] + arr[1] + arr[2] + arr[3] }
        })
        setOptions(list)
      })
  }, [])

  const handleSelect = useCallback((value: string) => {
    setAddress(value)
  }, [])

  const locate = useCallback(() => {
    if (!address) return
    setShowMap(true)
    setTimeout(() => {
      mapRef.current?.initMap(address)
    }, 100)
  }, [address])

  return (
    <div>
      <div style={{ marginTop: 25, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'nowrap' }}>
        <div style={{ flex: '0 0 600px' }}>
          <AutoComplete
            value={address}
            options={options}
            onSearch={fetchSuggestions}
            onSelect={handleSelect}
            onChange={setAddress}
            style={{ width: '100%' }}
            allowClear
          />
        </div>
        <Button
          type="primary"
          icon={<EnvironmentOutlined />}
          disabled={!address}
          onClick={locate}
        >
          定位
        </Button>
      </div>
      {showMap && <BaiduMapDialog ref={mapRef} />}
    </div>
  )
}

export default BaiduMapSearchLocate
