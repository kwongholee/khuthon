import { createSlice } from "@reduxjs/toolkit";

export const show = createSlice({
    name: 'show',
    initialState: {show: false},
    reducers: {
        openModal: (state) => {
            state.show = true
        },
        closeModal: (state) => {
            state.show = false
        }
    }
})

export const {openModal, closeModal} = show.actions;

export default show.reducer