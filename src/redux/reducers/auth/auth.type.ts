export type AuthState = {
    accessToken: string
    refreshToken: string
    user: User
}

export type User = {
    username: string
    email: string
    phoneNumber: string
    avatar: string
    address: string
    role: string
    status: string
    _id: string
}

export type PayloadRegisterUser = {
    username: string
    email: string
    password: string
}

export type PayloadLoginUser = {
    email: string
    password: string
}

export type PayloadUpdateUser = {
    _id: string
    username: string
    phoneNumber: string
    address: string
    avatar: string
}
