import { createSlice } from "@reduxjs/toolkit";

export const quiz = createSlice({
    name: 'quiz',
    initialState: {quiz: []},
    reducers: {
        getQuiz: (state, action) => {
            state.quiz.push(action.payload)
        }
    }
})

export const {getQuiz} = quiz.actions;

export default quiz.reducer