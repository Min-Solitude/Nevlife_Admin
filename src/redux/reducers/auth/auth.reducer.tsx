import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthState, PayloadLoginUser, PayloadRegisterUser, PayloadUpdateUser } from './auth.type'
import http from 'utils/http'
import { toast } from 'react-toastify'
import history from 'redux/store/history'

const initialState: AuthState = {
    accessToken: '',
    refreshToken: '',
    user: {
        username: '',
        email: '',
        phoneNumber: '',
        avatar: '',
        status: '',
        address: '',
        role: '',
        _id: ''
    }
}

// REGISTER
export const authRegister = createAsyncThunk('auth/register', async (payload: PayloadRegisterUser) => {
    const res = await http.post('/auth/register', payload)

    if (res.data.statusCode != 200) {
        toast.error(res.data.message)
        return
    }

    return res.data.data
})

// LOGIN
export const authLogin = createAsyncThunk('auth/login', async (payload: PayloadLoginUser) => {
    const res = await http.post('/auth/login', payload)

    if (res.data.statusCode != 200) {
        toast.error(res.data.message)
        return
    }

    return res.data.data
})

const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: (state: AuthState) => {
            state.accessToken = ''
            state.refreshToken = ''
            state.user = {
                username: '',
                email: '',
                phoneNumber: '',
                avatar: '',
                status: '',
                address: '',
                _id: '',
                role: ''
            }

            history.push('/login')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authRegister.fulfilled, (state, action) => {
            if (!action.payload) return state
            history.push('/login')

            toast.success('Đăng ký thành công')

            return {
                ...action.payload
            }
        })
        builder.addCase(authLogin.fulfilled, (state, action) => {
            if (!action.payload) return state
            history.push('/')
            toast.success('Đăng nhập thành công')

            return {
                ...action.payload
            }
        })
    }
})

export const AuthAction = reducer.actions
export const AuthReducer = reducer.reducer
