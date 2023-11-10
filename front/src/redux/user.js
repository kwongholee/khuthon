import { configureStore, createSlice } from '@reduxjs/toolkit'


// userId redux
export const user = createSlice( {
  name: 'user',
  initialState: {userId : '', lang : ''},
  reducers: {
    setUserId(state, action) {
        state.userId = action.payload
    },
    setLang(state, action) {
        state.lang = action.payload
    }
  }
})

export const {setUserId, setLang} = user.actions
export default user.reducer
