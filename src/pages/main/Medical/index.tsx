import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'
import CalendarHome from '../Home/components/Calendar'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useState } from 'react'
import { AppointmentState, getAllAppointment, getUserBtId, getUserWithRoleByDoctor } from 'redux/reducers'
import UpdateStatus from './UpdateStatus'
import { toast } from 'react-toastify'

const Medical = () => {
    const dispatch = useAppDispatch()
    const listAppointment = useAppSelector((state) => state.appointment.listAppointment)

    const [isFilter, setIsFilter] = useState(false)

    const [isSelectDoctor, setIsSelectDoctor] = useState('')

    const [isDetailAppointment, setIsDetailAppointment] = useState<AppointmentState>()
    const [isSelectUpdateStatus, setIsSelectUpdateStatus] = useState(false)
    const [isDataUpdate, setIsDataUpdate] = useState<any>({})

    const account = useAppSelector((state) => state.auth.user.role)

    const checkUser = useAppSelector((state) => state.user.userDetail)

    useEffect(() => {
        dispatch(getAllAppointment(isSelectDoctor))
    }, [isSelectDoctor])

    const handleUpdateStatus = (_id: string, _idDoctor: string) => {
        if (account !== 'admin') {
            toast.error('Bạn không thể cập nhật tài khoản này')
            return
        }

        dispatch(getUserBtId(_idDoctor))

        if (checkUser.status === 'block' || checkUser.status === 'inactive') {
            toast.error('Tài khoản này đã bị khóa hoặc chưa được xác nhận')
            return
        }

        setIsSelectUpdateStatus(true)
        const data = listAppointment.find((item) => item._id === _id)
        setIsDataUpdate(data)
    }

    const handleSlectDoctor = (username: string) => {
        setIsSelectDoctor(username)
    }

    const listDoctor = useAppSelector((state) => state.user.user)

    const newListDoctor = listDoctor.filter((item) => {
        if (item.status === 'active' && item.role === 'doctor') {
            return item
        }
    })

    return (
        <View
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='flex gap-8'
        >
            <View className='flex-1 '>
                <View className='relative flex items-center justify-end '>
                    <motion.button
                        className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white'
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsFilter(!isFilter)}
                    >
                        <IonIcon name='filter-outline' className='text-[1rem]' />
                    </motion.button>
                    {isFilter && (
                        <View className='absolute left-0 flex gap-4'>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={
                                    isSelectDoctor === ''
                                        ? 'rounded-lg border border-gray-300  bg-white px-4 py-2  text-[0.9rem] text-blue-500 duration-200'
                                        : 'rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-[0.9rem] text-gray-900 duration-200 hover:bg-white hover:text-blue-500'
                                }
                                onClick={() => handleSlectDoctor('')}
                            >
                                Tất cả
                            </motion.button>
                            {newListDoctor.map((item, index) => (
                                <motion.button
                                    key={index}
                                    whileTap={{ scale: 0.9 }}
                                    className={
                                        isSelectDoctor === item.username
                                            ? 'rounded-lg border border-gray-300  bg-white px-4 py-2  text-[0.9rem] text-blue-500 duration-200'
                                            : 'rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-[0.9rem] text-gray-900 duration-200 hover:bg-white hover:text-blue-500'
                                    }
                                    onClick={() => handleSlectDoctor(item.username)}
                                >
                                    {item.username}
                                </motion.button>
                            ))}
                        </View>
                    )}
                </View>
                <View className='mt-4 flex gap-8'>
                    <View className='flex h-[50rem] flex-1 flex-col gap-4 overflow-y-scroll'>
                        {listAppointment.map((item, index) => (
                            <View key={index} className='relative flex rounded-lg border border-gray-200 bg-white p-2'>
                                <View className='h-[10rem] w-[10rem] rounded-lg bg-yellow-600'>
                                    <img
                                        src={
                                            item.doctor?.avatar ||
                                            'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                                        }
                                        alt='nev'
                                        className='h-full w-full rounded-lg object-cover'
                                    />
                                </View>
                                <View className='px-4'>
                                    <h1 className='text-[1.2rem] font-bold text-gray-900'>{item.name}</h1>
                                    <span className='text-[0.9rem] text-red-800'>
                                        {item.timeOpen} - {item.timeClose}
                                    </span>
                                    <p>
                                        Thông tin: {item.doctor.username} - {item.doctor.phoneNumber}
                                    </p>
                                    <p>
                                        Giá:{' '}
                                        {item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </p>
                                    <View className='mt-2 flex items-center gap-4'>
                                        <motion.button
                                            className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white'
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setIsDetailAppointment(item)}
                                        >
                                            <span className='text-[0.9rem]'>Xem chi tiết</span>
                                            <IonIcon name='arrow-forward-outline' className='text-[1rem]' />
                                        </motion.button>
                                        {account === 'admin' && (
                                            <motion.button
                                                className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white'
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleUpdateStatus(item._id, item.doctor._id)}
                                            >
                                                Cập nhật
                                            </motion.button>
                                        )}
                                    </View>
                                </View>

                                {item.status === 'active' ? (
                                    <span className='absolute right-4 top-4 rounded-lg bg-green-400 px-4 py-1 text-white'>
                                        Đã xác nhận
                                    </span>
                                ) : item.status === 'inactive' ? (
                                    <span className='absolute right-4 top-4 rounded-lg bg-yellow-400 px-4 py-1 text-white'>
                                        Chưa xác nhận
                                    </span>
                                ) : (
                                    <span className='absolute right-4 top-4 rounded-lg bg-red-400 px-4 py-1 text-white'>
                                        Khóa
                                    </span>
                                )}
                            </View>
                        ))}
                    </View>
                    <View className='max-w-[22rem] flex-1 '>
                        {isDetailAppointment && (
                            <>
                                <View className='relative flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 py-8'>
                                    <View className='h-[5rem] w-[5rem] rounded-full border border-gray-800'>
                                        <img
                                            src={
                                                isDetailAppointment?.doctor?.avatar ||
                                                'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                                            }
                                            alt='nev'
                                            className='h-full w-full rounded-full object-cover'
                                        />
                                    </View>
                                    <View className='text-center'>
                                        <h1 className='text-[1.2rem] font-bold text-gray-900'>
                                            {isDetailAppointment?.doctor?.username || 'Anonymouse'}
                                        </h1>
                                        <p className='text-[0.9rem] text-red-600'>
                                            {isDetailAppointment?.doctor?.specialized || '---'}
                                        </p>
                                        <p className='mt-2 rounded-lg bg-blue-500 px-4 py-1 text-white'>
                                            {isDetailAppointment?.doctor?.phoneNumber || '000-000-000'}
                                        </p>
                                        <View className='mt-4 flex justify-center gap-4'>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg border border-blue-500 bg-white text-blue-500'
                                            >
                                                <IonIcon name='call-outline' className='text-[1.5rem]' />
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg border border-blue-500 bg-white text-blue-500'
                                            >
                                                <IonIcon name='chatbox-outline' className='text-[1.5rem]' />
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg border border-blue-500 bg-white text-blue-500'
                                            >
                                                <IonIcon name='mail-outline' className='text-[1.5rem]' />
                                            </motion.button>
                                        </View>
                                    </View>
                                    <View className='absolute right-4 top-4 flex flex-col'>
                                        {Array.from(
                                            { length: Number(isDetailAppointment?.doctor?.evaluate) },
                                            (_, index) => (
                                                <IonIcon
                                                    key={index}
                                                    name='star-outline'
                                                    className='text-[1.5rem] text-yellow-500'
                                                />
                                            )
                                        )}
                                    </View>
                                </View>
                                <View className='mt-8 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4'>
                                    <h1 className='text-[1.2rem] font-bold text-blue-500'>
                                        {isDetailAppointment?.name}
                                    </h1>
                                    <View className='flex items-center gap-2'>
                                        <label className='text-[1rem] font-bold text-gray-800'>Địa chỉ:</label>
                                        <p className='limit-1 max-w-[15rem] text-[0.9rem] text-gray-500'>
                                            {isDetailAppointment?.address}
                                        </p>
                                    </View>
                                    <View className='flex items-center gap-2'>
                                        <label className='text-[1rem] font-bold text-gray-800'>Giá:</label>
                                        <p className='text-[0.9rem] text-red-600'>
                                            {isDetailAppointment?.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </p>
                                    </View>
                                    <View className='flex items-center gap-2'>
                                        <label className='text-[1rem] font-bold text-gray-800'>Thời gian:</label>
                                        <View className='flex items-center gap-2'>
                                            <span className=' rounded-full bg-blue-500 px-4 py-1 text-white'>
                                                {isDetailAppointment?.timeOpen}
                                            </span>
                                            <span className='text-blue-500'>-</span>
                                            <span className='rounded-full bg-blue-500 px-4 py-1 text-white'>
                                                {isDetailAppointment?.timeClose}
                                            </span>
                                        </View>
                                    </View>
                                    <View className='flex items-center gap-2'>
                                        <label className='text-[1rem] font-bold text-gray-800'>Mô tả:</label>
                                        <p className='text-[0.9rem] text-gray-500'>
                                            {isDetailAppointment?.description}
                                        </p>
                                    </View>
                                </View>
                                <View className='mt-8 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4'>
                                    {isDetailAppointment?.date && (
                                        <View className='flex flex-col gap-4'>
                                            {Object.keys(isDetailAppointment.date).map((date) => (
                                                <View key={date} className='flex items-start gap-2 '>
                                                    <h3 className='text-gray-700'>{date}:</h3>
                                                    <View className='flex flex-col gap-2'>
                                                        {isDetailAppointment.date[date].map((timeSlot) => (
                                                            <p
                                                                className='rounded-full bg-blue-500 px-2 py-1 text-center text-white'
                                                                key={timeSlot}
                                                            >
                                                                {timeSlot}
                                                            </p>
                                                        ))}
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </View>
            <View className='max-w-[22rem] flex-1 border-l border-gray-200 pl-8'>
                <View>
                    <CalendarHome />
                </View>
                <View className='mt-4 flex items-center justify-between'>
                    <h2 className='text-[1.2rem] font-bold text-blue-500'>Danh sách tài khoản</h2>
                    <span className='text-[0.9rem] text-gray-600 underline'> Xem tất cả</span>
                </View>
                <View className='flex h-[30rem] flex-col gap-4 overflow-y-scroll py-4'>
                    {listDoctor.map((item, index) => (
                        <View key={index} className='flex gap-4 rounded-lg border border-gray-200 p-2'>
                            <View className='h-[3rem] w-[3rem] rounded-lg'>
                                <img
                                    src={
                                        item?.avatar ||
                                        'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
                                    }
                                    alt='nev'
                                    className='h-full w-full rounded-lg object-cover'
                                />
                            </View>
                            <View>
                                <h1 className='text-[1.1rem] font-bold text-gray-900'>
                                    {item?.username || 'Anonymouse'}
                                </h1>
                                <p className='text-[0.9rem] text-red-600'>
                                    {item?.specialized || 'Chưa cập nhật chuyên khoa'}
                                </p>
                            </View>
                        </View>
                    ))}
                </View>
                {isSelectUpdateStatus && (
                    <UpdateStatus
                        _id={isDataUpdate._id}
                        status={isDataUpdate.status}
                        close={() => {
                            setIsSelectUpdateStatus(false)
                            setIsDataUpdate(null)
                        }}
                    />
                )}
            </View>
        </View>
    )
}

export default Medical
