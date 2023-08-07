import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'
import Date from './components/Date'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useState } from 'react'
import { BookingState, getAllBooking } from 'redux/reducers'
import DetailBooking from './components/DetailBooking'

const Bill = () => {
    const dispatch = useAppDispatch()
    const listBooking = useAppSelector((state) => state.booking.booking)
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState<BookingState>()

    useEffect(() => {
        dispatch(getAllBooking())
    }, [])

    return (
        <View
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='relative min-h-[87vh] '
        >
            <View>
                <Date />
            </View>
            <View className='mt-4 flex flex-col gap-2'>
                <View className='flex items-center rounded-lg bg-gray-200 py-3 text-gray-900'>
                    <span className='flex flex-1 justify-center'>#</span>
                    <span className='flex flex-[2] justify-center'>Tên bệnh nhân</span>
                    <span className='flex flex-[2] justify-center'>Tên phòng khám</span>
                    <span className='flex flex-[2] justify-center'>Ngày khám</span>
                    <span className='flex flex-[2] justify-center'>Thời gian </span>
                    <span className='flex flex-[2] justify-center'>Giá</span>
                    <span className='flex flex-[2] justify-center'>Trạng thái</span>
                    <span className='flex flex-1 justify-center'></span>
                </View>
                {listBooking.map((item, index) => (
                    <View
                        key={index}
                        className='flex cursor-pointer rounded-lg border border-gray-200 bg-white bg-white py-3 text-[0.9rem] text-gray-800 duration-200 hover:bg-gray-100 '
                    >
                        <span className='flex flex-1 justify-center'>{index + 1}</span>
                        <span className='flex flex-[2] justify-center'>{item.userBooking.username}</span>
                        <span className='flex flex-[2] justify-center'>
                            <p className='limit-1'>{item.appointment.name}</p>
                        </span>
                        <span className='flex flex-[2] justify-center'>{item.date}</span>
                        <span className='flex flex-[2] justify-center'>{item.time}</span>
                        <span className='flex flex-[2] justify-center'>
                            {item.appointment.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </span>

                        <View className='flex flex-[2] justify-center '>
                            {item.status === 'inactive' ? (
                                <span className='rounded-full bg-yellow-500 px-2 py-1 text-white'>Chờ xác nhận </span>
                            ) : item.status === 'active' ? (
                                <span className='bg-green-500 px-2 py-1 text-white'>Đã xác nhận</span>
                            ) : (
                                <span className='bg-red-500 px-2 py-1 text-white'>Đã hủy</span>
                            )}
                        </View>

                        <span className='relative flex flex-1 justify-center'>
                            <motion.button
                                className='flex items-center justify-center text-blue-500'
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setDataDetail(item)}
                            >
                                <IonIcon name='ellipsis-vertical' className='text-[1.2rem]' />
                            </motion.button>
                            {dataDetail && dataDetail._id === item._id && (
                                <View
                                    className='absolute bottom-0 right-0 z-50 w-[10rem] rounded-lg border border-gray-300 bg-gray-100 p-2 shadow-md'
                                    initial={{ opacity: 0, y: '100%' }}
                                    animate={{ opacity: 1, y: '100%', x: '-40%' }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className='flex w-full justify-center rounded-lg border border-blue-500 bg-white py-1 duration-200 hover:bg-blue-500 hover:text-white'
                                    >
                                        Cập nhật
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className='mt-2 flex w-full justify-center rounded-lg border border-blue-500 bg-white py-1  duration-200 hover:bg-blue-500 hover:text-white'
                                        onClick={() => setIsShowDetail(true)}
                                    >
                                        Xem chi tiết
                                    </motion.button>
                                </View>
                            )}
                        </span>
                    </View>
                ))}
            </View>
            {isShowDetail && (
                <DetailBooking
                    close={() => {
                        setIsShowDetail(false)
                        setDataDetail(undefined)
                    }}
                    data={dataDetail}
                />
            )}
        </View>
    )
}

export default Bill
