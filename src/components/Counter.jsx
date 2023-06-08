import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../features/funcionamiento/funcionamientoSlice'
import { useEffect, useState } from 'react'

export function Counter() {
  const count = useSelector((state) => state.funcionamiento.value)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState(1)
    console.log(incrementAmount)

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <input type="number" aria-label="Set increment amount" onChange={e => setIncrementAmount(parseInt(e.target.value))} />
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>increment by amount</button>
      </div>
    </div>
  )
}