import { createSlice } from '@reduxjs/toolkit'
import preguntas from '../../preguntas';

const initialState = {
  contador: 0,
  preguntaActual: null,
  preguntasRespondidas: [],
  respuestaCorrecta:0, // 0 cuando es neutro, 1 cuando es correcta
  tiempoState: 1, // 0 cuando se acaba. 1 cuando el reloj tiene tiempo
  keyReloj:0,
  correrReloj:true,
}

const preguntasSlice = createSlice({
  name: 'preguntas',
  initialState,
  reducers: {
    imprimirPreguntas: (state, action) => {
      state.respuestaCorrecta = 0
      if (state.contador === 0) {
        const preguntasDisponibles = preguntas.nivel_1.filter(
          pregunta => !state.preguntasRespondidas.includes(pregunta.pregunta)
        );
        const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
        const preguntaAleatoria = preguntasDisponibles[indiceAleatorio];
        state.preguntaActual = preguntaAleatoria;
        state.preguntasRespondidas.push(preguntaAleatoria.id);
      } else if (state.contador === 1) {
        const preguntasDisponibles = preguntas.nivel_2.filter(
          pregunta => !state.preguntasRespondidas.includes(pregunta.pregunta)
        );
        const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
        const preguntaAleatoria = preguntasDisponibles[indiceAleatorio];
        state.preguntaActual = preguntaAleatoria;
        state.preguntasRespondidas.push(preguntaAleatoria.id);
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
    }
  },
});

// Action creators are generated for each case reducer function
export const {imprimirPreguntas, seleccionarRespuesta, resetearContador, relojCero,pauseReloj,playReloj } = preguntasSlice.actions

export default preguntasSlice.reducer