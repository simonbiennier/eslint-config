// import React, { useState, useEffect } from "react"

// const App: React.FC = () => {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     console.log("Count changed:", count)
//   }, [count])

//   return <p>{count}</p>
// }

import type { FC } from "react"
import { useEffect, useState } from "react"

const App: FC = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Count changed:", count)
  }, [count])

  return <p>{count}</p>
}
