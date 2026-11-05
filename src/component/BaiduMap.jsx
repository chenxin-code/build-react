import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Modal, message } from 'antd'

const BaiduMapDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [coord, setCoord] = useState('')
  const containerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  const initMap = useCallback((address) => {
    setOpen(true)
    setTitle(address)
    setCoord('')

    setTimeout(() => {
      const map = new BMapGL.Map('container')
      mapInstanceRef.current = map
      map.enableScrollWheelZoom(true)
      map.addControl(new BMapGL.CityListControl())
      map.addControl(new BMapGL.ZoomControl())

      const geocoder = new BMapGL.Geocoder()
      geocoder.getPoint(
        address,
        (point) => {
          if (point) {
            setCoord(`${point.lng},${point.lat}`)
            map.centerAndZoom(point, 16)
            map.addOverlay(new BMapGL.Marker(point, { title: address }))
          } else {
            message.error('您选择的地址没有解析到结果！')
          }
        },
        '北京市',
      )
    }, 0)
  }, [])

  useImperativeHandle(ref, () => ({ initMap }))

  const dialogTitle = coord ? `${title}  [${coord}]` : title

  return (
    <Modal
      open={open}
      title={dialogTitle}
      width="60%"
      onCancel={() => setOpen(false)}
      footer={null}
      destroyOnHidden
      draggable
    >
      <div
        ref={containerRef}
        id="container"
        style={{ height: 400 }}
      />
    </Modal>
  )
})

BaiduMapDialog.displayName = 'BaiduMapDialog'

export default BaiduMapDialog
