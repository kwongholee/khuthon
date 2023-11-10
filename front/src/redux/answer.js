import { createSlice } from "@reduxjs/toolkit";

export const answer = createSlice({
    name: 'answer',
    initialState: {answer: [], cnt: 0, realanswer: []},
    reducers: {
        getAnswer: (state, action) => {
            state.answer.push(action.payload)
        },
        checkAnswer: (state, action) => {
            for(let i = 0; i < state.answer.length; i++) {
                if(action.payload[i] === state.answer[i]) {
                    state.answer.push({word: state.answer[i], right: true})
                    state.cnt += 1;
                }
                else {
                    state.answer.push({word: state.answer[i], right: false})
                }
            }

        }
    }
})

export const {getAnswer, checkAnswer} = answer.actions;

export default answer.reducer