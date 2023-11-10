import { createSlice } from '@reduxjs/toolkit'


// userId redux
export const recentBook = createSlice( {
  name: 'recentBook',
  initialState: [
    {bookId : '', title : '', date : '', bookImage : ''},  
    {bookId : 'sdf', title : '짜라투스트라는 이렇게 말했다', date : '2023-11-10', bookImage : ''},
    {bookId : '654e4f0eef24110668048911', title : '주홍색 연구', date : '2023-11-10', bookImage : 'https://m.media-amazon.com/images/I/41zV5nEnEEL.jpg'}  
  
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
