import { motion } from 'framer-motion'

import View from 'components/shared/View'
import IonIcon from '@reacticons/ionicons'
import CalendarHome from './components/Calendar'
import Staff from './components/Staff'
import ReeruitmentProgess from './components/ReeruitmentProgess'

const Home = () => {
    const nowDate = new Date()
    const newYear = nowDate.getFullYear()
    return (
        <View
            className=' m-auto flex w-full gap-8 '
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <View className='flex flex-1 flex-col gap-8'>
                <View className='flex h-[18rem] overflow-hidden rounded-2xl border border-gray-200 bg-white'>
                    <View className='flex flex-[1.5] flex-col items-start justify-around p-8'>
                        <h1 className='text-[1.8rem] font-bold tracking-wider text-gray-800'>Nevsolit manager</h1>
                        <p className=' max-w-[35rem] text-[1rem] text-gray-900'>
                            Check the system through the data table of Nevsolit. Statistical chart of service activity
                            over a week. This system is very good, but nothing terrible.
                        </p>
                        <motion.button
                            className='mt-4 rounded-lg bg-blue-500 px-8 py-2 text-white'
                            whileTap={{ scale: 0.9 }}
                        >
                            Get started
                        </motion.button>
                    </View>
                    <View className='relative flex flex-1 items-center justify-center'>
                        <img
                            src='https://img.freepik.com/free-vector/doctor-concept-illustration_114360-2532.jpg?w=826&t=st=1689070140~exp=1689070740~hmac=1ca402c46a41d1b8b83cf4501b76606a34a85c2472e19ae5fcf6a2d840e04760'
                            alt='nev'
                            className='absolute h-full'
                        />
                    </View>
                </View>
                <ReeruitmentProgess />
            </View>
            <View className='max-w-[25rem] flex-1 '>
                <View className='flex flex-col gap-8'>
                    <View className='flex items-center justify-between '>
                        <h1 className='text-[1.2rem] font-bold text-gray-700'>{newYear} - Nevsolit</h1>
                        <View className='flex items-center gap-4'>
                            <motion.button
                                className='flex h-[2.5rem] w-[2.5rem]   items-center justify-center rounded-lg bg-blue-500 text-white'
                                whileTap={{ scale: 0.9 }}
                            >
                                <IonIcon name='chevron-back-outline' className='text-[1.2rem]' />
                            </motion.button>
                            <motion.button
                                className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-blue-500 text-white'
                                whileTap={{ scale: 0.9 }}
                            >
                                <IonIcon name='chevron-forward-outline' className='text-[1.2rem]' />
                            </motion.button>
                        </View>
                    </View>
                    <View className=' rounded-2xl'>
                        <CalendarHome />
                    </View>
                    <View className='rounded-2xl border border-gray-200 bg-white'>
                        <Staff />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Home
