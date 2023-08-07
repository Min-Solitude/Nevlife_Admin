import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'
import ChartForum from './components/ChartForum'
import ChartInteract from './components/ChartInteract'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAllUser } from 'redux/reducers/user'
import { toast } from 'react-toastify'
import history from 'redux/store/history'
import UpdateAccount from './components/UpdateAccount'
import { useDebounce } from 'hooks/useDebounce'

const UserManager = () => {
    const dispatch = useAppDispatch()
    const checkAccount = useAppSelector((state) => state.auth.user.role)
    const [isSellectUpdate, setIsSellectUpdate] = useState(false)
    const [isDataUpdate, setIsDataUpdate] = useState<any>({})
    const [isQuery, setIsQuery] = useState('')
    const debouncedValue = useDebounce<string>(isQuery, 300)

    useEffect(() => {
        dispatch(getAllUser(isQuery))
    }, [debouncedValue])

    const listUser = useAppSelector((state) => state.user.user)

    const hanldeUpdateAccount = (id: string, role: string) => {
        if (checkAccount !== 'admin') {
            toast.error('Bạn không có quyền truy cập')
            history.back()
        }

        if (role === 'admin') {
            toast.error('Bạn không thể cập nhật tài khoản này')
            return
        }

        setIsSellectUpdate(true)
        const data = listUser.find((item) => item._id === id)
        setIsDataUpdate(data)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setIsQuery(e.target.value)
    }

    return (
        <View
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className='flex  gap-8'
        >
            <View className='flex-1 '>
                <View className='relative flex items-center justify-end gap-4 '>
                    <View className='absolute left-0'>
                        <input
                            type='text'
                            value={isQuery}
                            onChange={(e) => handleSearch(e)}
                            placeholder='Tìm kiếm '
                            className='rounded-lg border border-gray-300 px-4 py-2 outline-blue-500'
                        />
                    </View>
                    <motion.button
                        className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white'
                        whileTap={{ scale: 0.9 }}
                    >
                        <IonIcon name='filter' className='text-[1.2rem]' />
                    </motion.button>
                    <motion.button
                        className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white'
                        whileTap={{ scale: 0.9 }}
                    >
                        <IonIcon name='newspaper-outline' className='text-[1.2rem]' />
                    </motion.button>
                </View>
                <View className='mt-4 grid grid-cols-4 gap-4'>
                    {listUser.map((item, index) => (
                        <View className='max-w-[18rem] rounded-lg border  border-gray-200 p-2' key={index}>
                            <View className='h-[10rem] rounded-lg'>
                                <img
                                    src={
                                        item.avatar ||
                                        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                                    }
                                    alt={item.username}
                                    className='h-full w-full rounded-lg object-cover'
                                />
                            </View>
                            <View className='mt-4'>
                                <h2>{item.username}</h2>
                                <View className='mt-2 flex items-center justify-between text-[0.9rem] text-gray-600'>
                                    <span>Vai trò: {item.role}</span>
                                    <View className='flex items-center gap-2'>
                                        {item.role === 'admin' ? (
                                            <IonIcon
                                                name='shield-checkmark-outline'
                                                className='text-[1.2rem] text-green-500'
                                            />
                                        ) : item.role === 'user' ? (
                                            <IonIcon name='person-outline' className='text-[1.2rem] text-green-500' />
                                        ) : (
                                            <span className='flex items-center gap-1'>
                                                <span>{item.appointmentCount}</span>
                                                <IonIcon name='bag-outline' className='text-[1.2rem] text-green-500' />
                                            </span>
                                        )}
                                    </View>
                                </View>
                                <View className='mt-2 flex items-center justify-between rounded-lg border border-blue-500 bg-white p-2'>
                                    <button className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white '>
                                        {item.role === 'admin' ? (
                                            <IonIcon name='shield-checkmark-outline' className='text-[1.2rem]' />
                                        ) : (
                                            <IonIcon name='bag-outline' className='text-[1.2rem]' />
                                        )}
                                    </button>
                                    <View>
                                        Status:{' '}
                                        {item.status === 'active' ? (
                                            <span className='text-green-500'>Hoạt động</span>
                                        ) : (
                                            <span className='text-red-500'>Khóa</span>
                                        )}
                                    </View>
                                    <motion.button
                                        className='flex items-center justify-center'
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => hanldeUpdateAccount(item._id, item.role)}
                                    >
                                        <IonIcon name='ellipsis-vertical' className='text-[1.2rem] text-blue-500' />
                                    </motion.button>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <View className='max-w-[22rem] flex-1 '>
                <h1 className='text-[1.2rem] font-bold text-blue-500'>Quá trình theo dõi</h1>
                <View className='mt-2 h-[20rem] rounded-lg border border-gray-200'>
                    <ChartForum />
                </View>
                <View className='mt-12 h-[20rem] rounded-lg'>
                    <ChartInteract />
                </View>
            </View>
            {isSellectUpdate && (
                <UpdateAccount
                    _id={isDataUpdate._id}
                    close={() => {
                        setIsSellectUpdate(false)
                        setIsDataUpdate({})
                    }}
                    role={isDataUpdate.role}
                    status={isDataUpdate.status}
                />
            )}
        </View>
    )
}

export default UserManager
