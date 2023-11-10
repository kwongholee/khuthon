import { createSlice } from "@reduxjs/toolkit";

export const submitAnswer = createSlice({
    name: 'submitAnswer',
    initialState: {submitAnswer: []},
    reducers: {
        answer: (state, action) => {
            state.submitAnswer.push(action.payload);
        }
    }
})

export const {answer} = submitAnswer.actions;

export default submitAnswer.reducer