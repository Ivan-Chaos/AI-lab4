import { configureStore } from '@reduxjs/toolkit'
import diagnosisSlice from './slices/diagnosisSlice'

export default configureStore({
    reducer: { 
        diagnosis: diagnosisSlice
    },
})