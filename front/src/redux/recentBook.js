import { createSlice } from '@reduxjs/toolkit'


// userId redux
export const recentBook = createSlice( {
  name: 'recentBook',
  initialState: [
    {bookId : '', title : '', date : '', bookImage : ''},  
    {bookId : 'sdf', title : '짜라투스트라는 이렇게 말했다', date : '2023-11-10', bookImage : ''}  
  
  ],
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
