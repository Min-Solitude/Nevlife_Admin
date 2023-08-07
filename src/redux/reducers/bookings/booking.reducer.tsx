import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BookingState } from './booking.type'
import http from 'utils/http'

export type BookingsProps = {
    booking: BookingState[]
}

const initialState: BookingsProps = {
    booking: []
}

export const getAllBooking = createAsyncThunk('booking/getAllBooking', async () => {
    const response = await http.get('/booking/get-all')

    return response.data.data
})

const reducer = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBooking.fulfilled, (state, action) => {
            state.booking = action.payload
        })
    }
})

export const BookingAction = reducer.actions
export const BookingReducer = reducer.reducer
