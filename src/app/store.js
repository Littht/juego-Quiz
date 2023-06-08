import { configureStore } from '@reduxjs/toolkit'
import funcionamientoSlice from '@/features/funcionamiento/funcionamientoSlice'

export const store = configureStore({
  reducer: {
    funcionamiento: funcionamientoSlice,
  },
})