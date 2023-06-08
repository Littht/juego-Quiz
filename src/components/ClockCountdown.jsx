import styles from '../styles/Clock.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {relojCero,pauseReloj} from '../features/funcionamiento/funcionamientoSlice'
export const ClockCountdown = () => {
  const respuestaCorrecta = useSelector((state) => state.funcionamiento.respuestaCorrecta)
  const keyReloj = useSelector((state) => state.funcionamiento.keyReloj)
  const correrReloj = useSelector((state) => state.funcionamiento.correrReloj)
  const [tiempo, setTiempo] = useState(60)
  const dispatch = useDispatch() 

  const renderTime = ({ remainingTime }) => {  
    return (
      <div className={styles.timer}>
        <div className={styles.value}>{remainingTime}</div>
      </div>
    );
  };
  
  const onTimerUpdate = (timerInfo) => {
    if(respuestaCorrecta){
      dispatch(pauseReloj())
    }else{
      setTiempo(timerInfo);
    }
  };

  useEffect (() => {
    dispatch(relojCero(tiempo))
  },[tiempo === 0])

  return (
    <div className={styles.container}>
      <CountdownCircleTimer
        isPlaying={correrReloj}
        duration={60}
        size={100}
        colors={['#004777', '#F7B801', '#A30000']}
        colorsTime={[50, 30, 0]}
        key={keyReloj}
        onComplete={() =>{ 
          dispatch(pauseReloj())
        }}
        onUpdate={onTimerUpdate}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  )
}
