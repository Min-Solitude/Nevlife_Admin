export type DateAppointment = {
    [date: string]: string[]
}

export type DoctorAppointment = {
    _id: string
    username: string
    email: string
    avatar: string
    address: string
    phoneNumber: string
    specialized: string
    experience: number
    evaluate: number
}

export type AppointmentState = {
    _id: string
    name: string
    address: string
    phoneNumber: string
    timeOpen: string
    timeClose: string
    date: DateAppointment
    doctor: DoctorAppointment
    description: string
    price: number
    status: string
}

export type AppointmentUpdateStatus = {
    _id: string
    status: string
}
