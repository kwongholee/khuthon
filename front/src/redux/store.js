import { configureStore } from '@reduxjs/toolkit'
import { user } from './user'
import {recentBook} from './recentBook'
import {word} from './makeQuiz'
import {show} from './showModal'
import { answer } from './answer'
import {submitAnswer} from './submitAnswer'
import {quiz} from './quiz'
import {page} from './page'

export const store = configureStore({
  reducer: {
    user : user.reducer,
    recentBook : recentBook.reducer,
    word: word.reducer,
    show: show.reducer,
    answer: answer.reducer,
    submitAnswer: submitAnswer.reducer,
    quiz: quiz.reducer,
    page: page.reducer,
   }
}) 