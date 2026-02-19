// import React, { useState , FC} from "react"

// const App: React.FC = () => {
//   const [count, setCount] = useState(0)
//   return <button onClick={() => setCount(count + 1)}>Clicked{count}</button>
// }

import type { FC } from "react"
import { useState } from "react"

const App: FC = () => {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked
      {count}
    </button>
  )
}
