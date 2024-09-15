import { useState } from "react"

const useCounter = (initialVal: number) => {
  const [count, setCount] = useState(initialVal)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialVal)

  return {
    count, increment, decrement, reset
  }
}

export {
  useCounter
}