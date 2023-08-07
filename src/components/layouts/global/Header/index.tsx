import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'
import { useEffect, useState } from 'react'
import { MessageProps } from 'redux/reducers'

const Header = () => {
    const [isShowMessage, setIsShowMessage] = useState(false)
    const [isNoticeMessage, setIsNoticeMessage] = useState(true)
    const [isMessage, setIsMessage] = useState<MessageProps[]>(JSON.parse(localStorage.getItem('message') || '[]'))

    useEffect(() => {
        window.addEventListener('notification', (event: any) => {
            const message: MessageProps[] = JSON.parse(localStorage.getItem('message') || '[]')
            let check = true

            message.forEach((item: MessageProps) => {
                if (item.seeMess === false) {
                    check = false
                }
            })

            setIsNoticeMessage(check)
            setIsMessage(message)
        })
    }, [isMessage])

    const handleCheckMessage = () => {
        const message: MessageProps[] = JSON.parse(localStorage.getItem('message') || '[]')

        message.forEach((item: MessageProps) => {
            if (item.seeMess === false) {
                item.seeMess = true
            }
        })

        const data = JSON.stringify(message)
        localStorage.setItem('message', data)

        setIsShowMessage(!isShowMessage)
        setIsNoticeMessage(true)
        setIsMessage(message)
    }

    return (
        <View
            className='flex h-[5rem] items-center justify-between   px-8'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <View className='hidden xl:block'>
                <h1 className='text-[1.6rem] font-[800] uppercase tracking-widest text-gray-900'>NEVLIFE</h1>
            </View>
            <View className='flex w-full items-center justify-between gap-8  xl:w-auto xl:justify-start'>
                <View className='flex items-center rounded-2xl bg-gray-100 px-4 py-2'>
                    <input type='text' placeholder='Search' className='bg-transparent outline-none' />
                    <motion.button className='flex items-center justify-center text-gray-800' whileTap={{ scale: 0.9 }}>
                        <IonIcon name='search-outline' className='text-[1.2rem]' />
                    </motion.button>
                </View>
                <View className='flex items-center gap-8'>
                    <motion.button className='flex items-center justify-center text-gray-800' whileTap={{ scale: 0.9 }}>
                        <IonIcon name='notifications-outline' className='text-[1.2rem]' />
                    </motion.button>
                    <motion.button
                        className='relative flex items-center justify-center text-gray-800'
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setIsShowMessage(!isShowMessage)
                            handleCheckMessage()
                        }}
                    >
                        {!isNoticeMessage && (
                            <span className='absolute left-0 top-0 h-2 w-2 translate-x-[-50%] translate-y-[-25%] rounded-full bg-red-600'></span>
                        )}
                        <IonIcon name='mail-outline' className='text-[1.2rem]' />
                        {isShowMessage && (
                            <View
                                className='absolute -bottom-4 right-0 z-50 flex h-[30rem]  min-w-[25rem] flex-col  gap-2 overflow-y-scroll rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-lg'
                                initial={{ opacity: 0, y: '120%' }}
                                animate={{ opacity: 1, y: '100%' }}
                                transition={{ duration: 0.5 }}
                            >
                                {isMessage.map((item: any, index: any) => (
                                    <View key={index} className='rounded-lg bg-white px-4 py-4'>
                                        <p className='text-sm text-gray-800'>
                                            {item.message} - {new Date(item.time).toLocaleTimeString()}
                                        </p>
                                    </View>
                                ))}
                            </View>
                        )}
                    </motion.button>
                    <motion.button className='flex items-center justify-center text-gray-800' whileTap={{ scale: 0.9 }}>
                        <IonIcon name='home-outline' className='text-[1.2rem]' />
                    </motion.button>
                </View>
            </View>
        </View>
    )
}

export default Header
