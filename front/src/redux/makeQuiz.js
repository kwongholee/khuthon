import { createSlice } from "@reduxjs/toolkit";

export const word = createSlice({
    name: 'word',
    initialState: {word: []},
    reducers: {
        pushWord: (state, action) => {
            state.word.push(action.payload)
        },
        deleteWord: (state, action) => {
            let copy = [...state.word];
            copy = copy.filter((e) => e !== action.payload)
            state.word = copy
        }
    }
})

export const {pushWord, deleteWord} = word.actions;

export default word.reducer