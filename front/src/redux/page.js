import { createSlice } from '@reduxjs/toolkit'


// page redux
export const page = createSlice( {
  name: 'page',
  initialState: {currentPosition : 0},
  reducers: {
    setPosition(state, action) {
        state.currentPosition = action.payload
    }
  }
})

export const {setPosition} = page.actions
export default page.reducer
