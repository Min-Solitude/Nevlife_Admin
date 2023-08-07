import View from 'components/shared/View'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { getUserBtId, updateStatusAppointment } from 'redux/reducers'

type UpdateStatusProps = {
    close: () => void
    _id: string
    status: string
}

const UpdateStatus = ({ close, _id, status }: UpdateStatusProps) => {
    const [statusUpdate, setStatusUpdate] = useState(status)
    const dispatch = useAppDispatch()
    // const checkUser = useAppSelector((state) => state.user.user)

    // console.log(checkUser)

    // useEffect(() => {
    //     dispatch(getUserBtId(_id))
    // }, [statusUpdate])

    const handleUpdateStatus = () => {
        const data = {
            _id,
            status: statusUpdate
        }

        dispatch(updateStatusAppointment(data))
    }

    return (
        <View
            className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[#ffffff95]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <View className='flex w-full max-w-[30rem] flex-col items-start gap-4 rounded-2xl border border-gray-300 bg-white p-4 shadow-md'>
                <h1 className='text-[1.2rem] font-bold uppercase text-blue-500'>Cập nhật </h1>
                <View className='flex w-full flex-col gap-2'>
                    <label className='text-[0.9rem] text-gray-700'>Trạng thái</label>
                    <select
                        className='w-full rounded-md border border-gray-300 p-2'
                        value={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                        <option value='inactive' defaultValue={statusUpdate === 'inactive' ? 'inactive' : undefined}>
                            Chưa xác nhận
                        </option>
                        <option value='active' defaultValue={statusUpdate === 'active' ? 'active' : undefined}>
                            Đã xác nhận
                        </option>
                        <option value='block' defaultValue={statusUpdate === 'block' ? 'block' : undefined}>
                            Khóa
                        </option>
                    </select>
                </View>
                <View className='mt-4 flex items-center gap-4'>
                    <motion.button
                        className=' rounded-md bg-blue-500 p-4 py-2 text-[0.9rem] font-bold text-white'
                        onClick={() => {
                            handleUpdateStatus()
                            close()
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Cập nhật
                    </motion.button>
                    <motion.button
                        className=' rounded-md bg-blue-500 p-4 py-2 text-[0.9rem] font-bold text-white'
                        onClick={() => {
                            close()
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Hủy
                    </motion.button>
                </View>
            </View>
        </View>
    )
}

export default UpdateStatus
