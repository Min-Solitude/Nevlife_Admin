import View from 'components/shared/View'
import { BookingState } from 'redux/reducers'
import { motion } from 'framer-motion'

type PropsDetailBooking = {
    close: () => void
    data?: BookingState
}

const DetailBooking = ({ close, data }: PropsDetailBooking) => {
    return (
        <View
            className='fixed right-0 top-0 z-50 flex h-screen w-[30%] flex-col gap-4 rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-md'
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0 }}
        >
            <h1 className='text-[1.2rem] font-bold uppercase text-blue-500'>Chi tiết lịch khám</h1>
            <View className='rounded-lg border border-gray-300 bg-white  p-4'>
                <h1 className='text-[1.2rem]'>Thông tin lịch đặt</h1>
                <View className='mt-2'>
                    <span className=''>Địa chỉ</span>
                    <span className='text-gray-700'> {data?.address}</span>
                </View>
                <View className='mt-2'>
                    <span className=''>Thời gian</span>
                    <span className='text-gray-700'>
                        {' '}
                        {data?.date} - {data?.time}
                    </span>
                </View>
                <View className='mt-2'>
                    <span className=''>SDT:</span>
                    <span className='text-gray-700'> {data?.phoneNumber}</span>
                </View>
                <View className='mt-2'>
                    <span className=''>Thẻ điện tử:</span>
                    <span className='text-gray-700'> {data?.PrintCard === false ? 'Không có' : 'Có'}</span>
                </View>
            </View>
            <View className='rounded-lg border border-gray-300 bg-white  p-4'>
                <h1 className='text-[1.2rem]'>Thông tin phòng khám</h1>
                <View className='mt-2'>
                    <span className=''>Tên phòng khám:</span>
                    <span className='text-gray-700'> {data?.appointment.name}</span>
                </View>
                <View className='mt-2'>
                    <span className=''>Giá:</span>
                    <span className='text-gray-700'>
                        {' '}
                        {data?.appointment.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                </View>
            </View>
            <View className='rounded-lg border border-gray-300 bg-white  p-4'>
                <h1 className='text-[1.2rem]'>Thông tin tài khoản</h1>
                <View className='mt-2 h-[5rem] w-[5rem] rounded-lg'>
                    <img
                        src={data?.userBooking.avatar}
                        alt={data?.userBooking.username}
                        className='h-full w-full rounded-lg object-cover'
                    />
                </View>
                <View className='mt-2'>
                    <span className=''>Tên tài khoản:</span>
                    <span className='text-gray-700'> {data?.userBooking.username}</span>
                </View>
                <View className='mt-2'>
                    <span className=''>Email:</span>
                    <span className='text-gray-700'>{data?.userBooking.email}</span>
                </View>
            </View>
            <motion.button
                className='rounded-lg bg-blue-500 px-4 py-2 text-white'
                onClick={close}
                whileTap={{ scale: 0.9 }}
            >
                Đóng
            </motion.button>
        </View>
    )
}

export default DetailBooking
