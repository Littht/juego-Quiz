import { createSlice } from '@reduxjs/toolkit'
import preguntas from '../../preguntas';

const initialState = {
  contador: 0,// cuando es 0 o más para avanzar, -1 cuando respondes mal
  preguntaActual: null,
  preguntasRespondidas: [],
  respuestaCorrecta:0, // 0 cuando es neutro, 1 cuando es correcta
  tiempoState: 1, // 0 cuando se acaba. 1 cuando el reloj tiene tiempo
  keyReloj:0, //esto es para pausar el reloj
  correrReloj:true, //esto es para pausarlo y que siga corriendo el tiempo
  juegoTerminado:false,
}

const preguntasSlice = createSlice({
  name: 'preguntas',
  initialState,
  reducers: {
    imprimirPreguntas: (state, action) => {
      state.respuestaCorrecta = 0
      console.log(state.contador,"contador")
      if (state.contador <= 4) {
        const preguntasDisponibles = preguntas.nivel_1.filter(
          pregunta => !state.preguntasRespondidas.includes(pregunta.pregunta)
        );
        const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
        const preguntaAleatoria = preguntasDisponibles[indiceAleatorio];
        state.preguntaActual = preguntaAleatoria;
        state.preguntasRespondidas.push(preguntaAleatoria.id);
      } else if (state.contador >= 5 && state.contador <=9) {
        const preguntasDisponibles = preguntas.nivel_2.filter(
          pregunta => !state.preguntasRespondidas.includes(pregunta.pregunta)
        );
        const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
        const preguntaAleatoria = preguntasDisponibles[indiceAleatorio];
        state.preguntaActual = preguntaAleatoria;
        state.preguntasRespondidas.push(preguntaAleatoria.id);
      }else{
        state.juegoTerminado = true
        state.preguntaActual = null
      }
    },
    seleccionarRespuesta : (state, action) =>{
      if(Object.keys(state.preguntaActual.respuesta)[0] === action.payload){
        state.contador = state.contador + 1
        state.respuestaCorrecta = 1
      }else{
        state.contador = -1 
        state.preguntaActual = null 
      }
    },
    relojCero : (state,action) =>{
      if(action.payload == 0){
        state.tiempoState = 0
        state.contador = -1 
        state.preguntaActual = null 
      }
    },
    playReloj : (state) =>{
      state.correrReloj = true
      state.keyReloj = state.keyReloj + 1
    },
    pauseReloj : (state) =>{
      state.correrReloj = false
    },
    resetearContador : (state) => {
      state.contador = 0
      state.tiempoState = 1
      state.juegoTerminado = false
    }
  },
});

// Action creators are generated for each case reducer function
export const {imprimirPreguntas, seleccionarRespuesta, resetearContador, relojCero,pauseReloj,playReloj } = preguntasSlice.actions

export default preguntasSlice.reducer