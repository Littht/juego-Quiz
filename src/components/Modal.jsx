import { useDispatch, useSelector} from "react-redux"
import { resetearContador, imprimirPreguntas,playReloj} from "@/features/funcionamiento/funcionamientoSlice"
import styles from '../styles/Modal.module.css'

export const Modal = () => {
    const respuestaCorrecta = useSelector((state) => state.funcionamiento.respuestaCorrecta)
    const contador = useSelector((state) => state.funcionamiento.contador)
    const tiempo = useSelector((state) => state.funcionamiento.tiempoState)
    const juegoTerminado = useSelector((state) => state.funcionamiento.juegoTerminado)
    const dispatch = useDispatch() 
  return (
    <div className={styles.container}>
        {
          respuestaCorrecta == 1 ? (
            <div className={styles.container_modal}>
                <div className={styles.box}>
                  <label className={styles.message} >Bien respondido, Selecciona avanzar si deseas seguir</label>
                  <button className={styles.button} onClick={() => dispatch(imprimirPreguntas(), dispatch(playReloj()))}>Avanzar</button>
                </div>
            </div>
          ) : contador == -1 || tiempo == 0 ? (
            <div className={styles.container_modal}>
                <div className={styles.box}> 
                  <label className={styles.message} htmlFor="">Maldito bruto,dale a inicio, peldite</label>
                  <button className={styles.button} onClick={() => dispatch(resetearContador())}>Inicio</button>
                </div>
            </div>
          ): juegoTerminado == true ? (
            <div className={styles.container_modal}>
              <div className={styles.box}> 
                <label className={styles.message} htmlFor="">Felicidades mmgvo</label>
                <button className={styles.button} onClick={() => dispatch(resetearContador())}>Inicio</button>
              </div>
            </div>
          ) : (
            <div></div>
          )
        }
    </div>
  )
}
