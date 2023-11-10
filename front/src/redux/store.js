import { configureStore } from '@reduxjs/toolkit'
import { showModal } from './showModal'

export default configureStore({
  reducer: {
    showModal
   }
}) 