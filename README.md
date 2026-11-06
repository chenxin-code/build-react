# build-react

React 18 + JavaScript + Vite 项目，从 build-vue2 / build-vue3 迁移的 Demo 页面集合。

## 技术栈

- React 18
- JavaScript
- Vite 6
- React Router 6
- Ant Design 5
- Axios
- Three.js
- Lodash

## 开发

```bash
npm install
npm run dev
```

访问 `http://localhost:333`

## Demo 页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 百度地图搜索/定位 | `/demo/baiduMap-search-locate` | 地址自动完成搜索 + 地图定位 |
| 水滴 | `/demo/water` | CSS 动画水滴效果 |
| 批量创建计划 | `/demo/batch-create-plan` | 产品计划批量生成 |
| 3D地球 | `/demo/3d-earth` | Three.js 3D 地球，支持拖拽/缩放/自转 |

## 项目结构

```
src/
├── api/              # API 请求封装
├── component/        # 公共组件
├── page/demo/        # Demo 页面
├── res/              # 静态资源
├── router.jsx        # 路由配置
├── App.jsx           # 应用入口
└── main.jsx          # 挂载入口
```
