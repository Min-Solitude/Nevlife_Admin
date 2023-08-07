import IonIcon from '@reacticons/ionicons'
import View from 'components/shared/View'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useState } from 'react'
import { UserDoctor, getUserWithRoleByDoctor } from 'redux/reducers/user'
import DetailDoctor from '../DetailDoctor'
import { useNavigate } from 'react-router-dom'

const ReeruitmentProgess = () => {
    const dispatch = useAppDispatch()
    const [selectedDoctor, setSelectedDoctor] = useState<UserDoctor | null>(null)
    const [isShowDetail, setIsShowDetail] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserWithRoleByDoctor())
    }, [])

    const listDoctor = useAppSelector((state) => state.user.user)

    return (
        <View className='flex flex-col gap-4'>
            <View className='flex items-center justify-between'>
                <h1 className='text-[1.4rem] font-bold text-gray-800'>Bác sĩ</h1>
                <motion.button
                    className=' flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-[0.9rem] text-white'
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        navigate(`/user-manager/all`)
                    }}
                >
                    Tất cả
                </motion.button>
            </View>
            <View className='flex flex-col gap-4'>
                <View className='flex rounded-lg bg-blue-500 p-4 text-white'>
                    <View className='flex-1 text-center'>Họ tên </View>
                    <View className='flex-1 text-center'>Khoa</View>
                    <View className='flex-1 text-center'>Kinh nghiệm</View>
                    <div className='flex-[0.5] text-center'></div>
                </View>
                {listDoctor.map((doctor: UserDoctor) => (
                    <View key={doctor._id} className='flex cursor-pointer rounded-lg bg-gray-200 p-2 text-gray-700'>
                        <View className='flex flex-1 items-center justify-center gap-4'>
                            <View className='h-[3rem] w-[3rem] overflow-hidden rounded-full'>
                                <img src={doctor.avatar} alt='nev' className='h-full w-full object-cover' />
                            </View>
                            <span>{doctor.username}</span>
                        </View>
                        <View className='flex flex-1 items-center justify-center'>
                            <span>{doctor.specialized}</span>
                        </View>
                        <View className='flex flex-1 items-center justify-center'>
                            <span>{doctor.experience} năm</span>
                        </View>
                        <div className='flex flex-[0.5] items-center justify-center'>
                            <motion.button
                                className='relative flex items-center justify-center  p-4 text-[1.2rem]'
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <IonIcon name='ellipsis-vertical' />
                                {selectedDoctor && selectedDoctor._id === doctor._id && (
                                    <View
                                        className='absolute bottom-0 right-0  w-[8rem] translate-x-[100%] rounded-lg border border-gray-300 bg-white p-2 text-[0.8rem] text-gray-800 shadow-lg'
                                        initial={{ opacity: 0, x: '100%', scale: 0.9 }}
                                        animate={{ opacity: 1, x: '100%', scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        onClick={() => {
                                            setIsShowDetail(true)
                                        }}
                                    >
                                        Chi tiết
                                    </View>
                                )}
                            </motion.button>
                        </div>
                    </View>
                ))}
            </View>
            {isShowDetail && (
                <DetailDoctor
                    close={() => {
                        setIsShowDetail(false)
                        setSelectedDoctor(null)
                    }}
                    address={selectedDoctor?.address || ''}
                    avatar={selectedDoctor?.avatar || ''}
                    email={selectedDoctor?.email || ''}
                    evaluate={selectedDoctor?.evaluate || ''}
                    experience={selectedDoctor?.experience || ''}
                    phoneNumber={selectedDoctor?.phoneNumber || ''}
                    role={selectedDoctor?.role || ''}
                    specialized={selectedDoctor?.specialized || ''}
                    username={selectedDoctor?.username || ''}
                />
            )}
        </View>
    )
}

export default ReeruitmentProgess
