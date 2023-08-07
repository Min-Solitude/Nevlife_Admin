export type BookingState = {
    _id: string
    appointment: {
        _id: string
        name: string
        price: number
    }
    userBooking: {
        _id: string
        username: string
        email: string
        avatar: string
    }
    date: string
    time: string
    status: string
    PrintCard: boolean
    address: string
    phoneNumber: string
    email: string
    total: number
}
