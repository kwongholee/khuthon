import { createSlice } from '@reduxjs/toolkit'

export const showModal = createSlice({
  name: 'showModal',
  initialState: {value: false},
  reducers: {
    closeModal(state) {
      state.value = false
    },
    openModal(state) {
      state.value = true
    }
  }
})

export const {closeModal, openModal} = showModal.actions;

export default showModal.reducer;