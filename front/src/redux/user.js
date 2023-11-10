import { configureStore, createSlice } from '@reduxjs/toolkit'


// userId redux
export const user = createSlice( {
  name: 'user',
  initialState: {userId : '', lang: '', image: 4},
  reducers: {
    setUserId(state, action) {
        state.userId = action.payload
    },
    setLang(state, action) {
      state.lang = action.payload
    },
    setImage(state, action) {
        state.image = action.payload
    }
  }
})

export const {setUserId, setLang, setImage} = user.actions
export default user.reducer
