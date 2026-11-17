import Brother1 from './Brother1'
import Brother2 from './Brother2'
import Brother3 from './Brother3'
import BrotherA from './BrotherA'
import BrotherB from './BrotherB'

function BrotherComponent() {
  return (
    <div>
      <h1>兄弟组件Redux通信</h1>
      <div className="brother-row">
        <Brother1 />
        <Brother2 />
        <Brother3 />
      </div>
      <h1>兄弟组件eventBus通信</h1>
      <div className="brother-row">
        <BrotherA />
        <BrotherB />
      </div>
    </div>
  )
}

export default BrotherComponent
