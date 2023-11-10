import { configureStore } from '@reduxjs/toolkit'
import { showModal } from './showModal'
import { user } from './user'

export const store = configureStore({
  reducer: {
    showModal : showModal.reducer,
    user : user.reducer
   }
}) 