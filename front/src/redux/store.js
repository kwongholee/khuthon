import { configureStore } from '@reduxjs/toolkit'
import {word} from './makeQuiz'
import {show} from './showModal'

export const store = configureStore({
  reducer: {
    word: word.reducer,
    show: show.reducer
  }
})