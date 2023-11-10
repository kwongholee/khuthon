import { configureStore, createSlice } from '@reduxjs/toolkit'


// userId redux
let user = createSlice( {
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
export default configureStore({
  reducer: {
    userId : userId.reducer
  }
}) 