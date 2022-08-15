import { configureStore } from '@reduxjs/toolkit'
 import { encuestaSlice } from './slices/encuesta'

export const store = configureStore({
    reducer: {
        surveys: encuestaSlice.reducer,
    },
})