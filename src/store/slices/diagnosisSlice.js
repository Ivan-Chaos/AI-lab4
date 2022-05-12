import { createSlice } from "@reduxjs/toolkit";

export const diagnosisSlice = createSlice({
    name: 'quiz',
    initialState: {
        taken_at: undefined
    },

    reducers: {
        setTakenAt: (state, action)=>{
            debugger;
            return {...state, taken_at: action.payload}
        }
    }
});

export const {setTakenAt} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;