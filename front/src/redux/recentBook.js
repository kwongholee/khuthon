import { createSlice } from '@reduxjs/toolkit'


// userId redux
export const recentBook = createSlice( {
  name: 'recentBook',
  initialState: [
    {bookId : '', title : '', date : '', bookImage : ''},  ],
  reducers: {
    addRecentBook(state, action) {
        if (state.bookId === '') {
            state.splice(action.payload, 0, 1)
        }
        state.push(action.payload)
    }

  }
})

export const { addRecentBook } = recentBook.actions
export default recentBook.reducer
