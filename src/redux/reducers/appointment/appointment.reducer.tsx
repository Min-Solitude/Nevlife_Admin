import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppointmentState, AppointmentUpdateStatus } from './appointment.type'
import http from 'utils/http'
import { toast } from 'react-toastify'

export type AppointmentProp = {
    listAppointment: AppointmentState[]
}

const initialState: AppointmentProp = {
    listAppointment: []
}

export const getAllAppointment = createAsyncThunk('appointment/getAllAppointment', async (payload: string) => {
    const res = await http.get(`/appointment/get-all?query=${payload}`)

    return res.data.data
})

export const updateStatusAppointment = createAsyncThunk(
    'appointment/updateStatusAppointment',
    async (payload: AppointmentUpdateStatus) => {
        await http.post(`/appointment/update-appointment`, payload)
        const resAppointment = await http.get(`/appointment/get-all?query=`)

        return resAppointment.data.data
    }
)

const reducer = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAppointment.fulfilled, (state, action) => {
            state.listAppointment = action.payload
        })
        builder.addCase(updateStatusAppointment.fulfilled, (state, action) => {
            window.dispatchEvent(
                new CustomEvent('notification', {
                    detail: {
                        message: 'Bạn đã cập nhật phòng khám',
                        time: new Date().getTime(),
                        seeMess: false
                    }
                })
            )
            toast.success('Cập nhật thành công')
            state.listAppointment = action.payload
        })
    }
})

export const AppointmentAction = reducer.actions
export const AppointmentReducer = reducer.reducer
