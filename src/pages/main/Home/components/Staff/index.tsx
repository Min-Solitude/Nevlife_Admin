import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'
import { useAppSelector } from 'hooks/useRedux'

const Staff = () => {
    const account = useAppSelector((state) => state.auth.user)

    return (
        <View className='flex flex-col items-center p-4'>
            <View className='flex flex-col items-center gap-2'>
                <View className='h-[5rem] w-[5rem] rounded-lg'>
                    <img
                        src={
                            account?.avatar ||
                            'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
                        }
                        alt='nev'
                        className='h-full w-full rounded-lg object-cover'
                    />
                </View>
                <h2 className='text-center text-[1.2rem]'>
                    {account?.username}
                    <p className='text-gray-500] text-[0.9rem]'>{account?.role}</p>
                </h2>
                <View className='flex items-center gap-8'>
                    <motion.button
                        className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-blue-500 bg-white'
                        whileTap={{ scale: 0.9 }}
                    >
                        <IonIcon name='chatbox' className='text-blue-500' />
                    </motion.button>
                    <motion.button
                        className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-blue-500 bg-white'
                        whileTap={{ scale: 0.9 }}
                    >
                        <IonIcon name='call' className='text-blue-500' />
                    </motion.button>
                    <motion.button
                        className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-blue-500 bg-white'
                        whileTap={{ scale: 0.9 }}
                    >
                        <IonIcon name='call' className='text-blue-500' />
                    </motion.button>
                </View>
            </View>
            <View className='mt-4 flex w-full flex-col gap-4'>
                <View className='flex items-center justify-between'>
                    <span>Công ty</span>
                    <p className='text-[0.8rem] text-gray-400'>Nevsolit</p>
                </View>
                <View className='flex items-center justify-between'>
                    <span>Địa chỉ</span>
                    <p className='text-[0.8rem] text-gray-400'>{account?.address}</p>
                </View>
                <View className='flex items-center justify-between'>
                    <span>Email</span>
                    <p className='text-[0.8rem] text-gray-400'>{account?.email}</p>
                </View>
            </View>
        </View>
    )
}

export default Staff
