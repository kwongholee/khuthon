import { configureStore } from '@reduxjs/toolkit'
import { showModal } from './showModal'
import { user } from './user'
import {recentBook} from './recentBook'
import {word} from './makeQuiz'
import {show} from './showModal'

export const store = configureStore({
  reducer: {
    showModal : showModal.reducer,
    user : user.reducer,
    recentBook : recentBook.reducer,
    word: word.reducer,
    show: show.reducer
   }
}) 