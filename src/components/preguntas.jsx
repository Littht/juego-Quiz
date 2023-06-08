import { useSelector, useDispatch } from 'react-redux'
import {imprimirPreguntas, playReloj, seleccionarRespuesta} from '../features/funcionamiento/funcionamientoSlice'
import styles from '../styles/Preguntas.module.css'
import { ClockCountdown } from '@/components/ClockCountdown'

export const Preguntas = () => {
    //const contador = useSelector((state) => state.funcionamiento.contador)
    const preguntaActual = useSelector ((state) => state.funcionamiento.preguntaActual)

    const dispatch = useDispatch()
    return (
        <div className={styles.container}>
            {preguntaActual ? (
                <div className={styles.caja_preguntas}>
                    <h2 className={styles.title}>{preguntaActual.pregunta}</h2>
                    <ul className={styles.container_preguntas}>
                    {preguntaActual.opciones.map((opcion, index) => (
                        <li className={styles.li} key={index}>
                        <button className={styles.button_pregunta} onClick={() => dispatch(seleccionarRespuesta(Object.keys(opcion)[0]))}>{Object.keys(opcion)[0]}. {opcion[Object.keys(opcion)[0]]}</button>
                        </li>  
                    ))}
                    </ul>
                    <ClockCountdown/>
                </div>
                
            ) : (
                <button className={styles.button_inicio} onClick={() => dispatch(imprimirPreguntas(), dispatch(playReloj()))}>Comenzar juego</button>
            )}
      </div>
    )
  }
  