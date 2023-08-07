import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import http from 'utils/http'
import { UserDoctor, handleUpdatePermission } from './user.type'
export type UserState = {
    user: UserDoctor[]
    userDetail: UserDoctor
}

export type MessageProps = {
    message: string
    time: Date
    seeMess: boolean
}

const initialState: UserState = {
    user: [],
    userDetail: {
        avatar: '',
        email: '',
        evaluate: '',
        experience: '',
        specialized: '',
        username: '',
        _id: '',
        address: '',
        phoneNumber: '',
        role: '',
        appointmentCount: 0,
        status: ''
    }
}

export const getUserWithRoleByDoctor = createAsyncThunk('user/getUserWithRoleByDoctor', async () => {
    const res = await http.get(`/user/doctor`)
    return res.data.data
})

export const getUserBtId = createAsyncThunk('user/getUserBtId', async (id: string) => {
    const res = await http.get(`/user/detail/${id}`)

    return res.data.data.data
})

export const getAllUser = createAsyncThunk('user/getAllUser', async (query: string = '') => {
    const res = await http.get(`/user/all?q=${query}`)
    return res.data.data
})

export const updatePermission = createAsyncThunk('user/updatePermission', async (payload: handleUpdatePermission) => {
    await http.put(`/user/update-permission`, payload)
    const resUser = await http.get(`/user/all?q=`)

    return resUser.data.data
})

const reducer = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWithRoleByDoctor.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(getUserBtId.fulfilled, (state, action) => {
            state.userDetail = action.payload
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(updatePermission.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(updatePermission.fulfilled, (state, action) => {
            state.user = action.payload
            window.dispatchEvent(
                new CustomEvent('notification', {
                    detail: {
                        message: 'Bạn đã cập nhật tài khoản',
                        time: new Date().getTime(),
                        seeMess: false
                    }
                })
            )
            toast.success('Cập nhật thành công')
        })
    }
})

export const UserAction = reducer.actions
export const UserReducer = reducer.reducer
