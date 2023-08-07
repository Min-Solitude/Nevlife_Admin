import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

import View from 'components/shared/View'

const Store = () => {
    return (
        <View
            className='flex gap-4'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <View className='flex flex-1 flex-col gap-4'>
                <View className='flex items-center justify-between'>
                    <span className='text-[1.2rem] font-bold uppercase tracking-normal text-blue-500'>
                        Store Manager
                    </span>
                    <View className='flex items-center gap-4 '>
                        <View className='flex items-center gap-4'>
                            <input
                                type='text'
                                placeholder='Search Product'
                                className='rounded-lg bg-gray-200 px-4 py-2 text-[0.9rem] outline-2 outline-blue-500  duration-200 focus:bg-white '
                            />
                            <motion.button
                                className='flex h-[2.5rem] w-[2.5rem] items-center items-center justify-center gap-2 rounded-lg  bg-blue-500 text-white'
                                whileTap={{ scale: 0.9 }}
                            >
                                <IonIcon name='search' className='text-[1.2rem]' />
                            </motion.button>
                        </View>
                        <motion.button
                            className='flex h-[2.5rem] w-[2.5rem] items-center items-center justify-center gap-2 rounded-lg border border-blue-500 bg-white text-blue-500'
                            whileTap={{ scale: 0.9 }}
                        >
                            <IonIcon name='filter' className='text-[1.2rem]' />
                        </motion.button>
                        <motion.button
                            className='flex items-center gap-2 rounded-lg border border-blue-500 bg-white px-4 py-2 text-blue-500'
                            whileTap={{ scale: 0.9 }}
                        >
                            <IonIcon name='add-outline' className='text-[1.2rem]' />
                            <span>Add </span>
                        </motion.button>
                    </View>
                </View>
                <View className='flex flex-col gap-2'>
                    <View className='flex rounded-lg bg-gray-200 px-4 py-3 text-gray-800'>
                        <span className='flex-1 text-center'>#</span>
                        <span className='flex-1  text-center'>Name</span>
                        <span className='flex-1  text-center'>Price</span>
                        <span className='flex-1  text-center'>Status</span>
                        <span className='flex-1  text-center'>Date Created</span>
                        <span className='flex-1  text-center'></span>
                    </View>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                        <View className='flex items-center rounded-lg border border-gray-200 bg-white px-4 py-3'>
                            <span className='flex-1  text-center'>#</span>
                            <span className='flex-1  text-center'>Máy trực tim</span>
                            <span className='flex-1  text-center'>1.200.000$</span>
                            <span className='flex flex-1  items-center justify-center'>
                                <IonIcon name='checkmark-circle' className='text-green-500' />
                            </span>
                            <span className='flex-1  text-center'>21/07/2023</span>
                            <span className='flex  flex-1 items-center justify-center'>
                                <motion.button className='flex items-center justify-center' whileTap={{ scale: 0.9 }}>
                                    <IonIcon name='ellipsis-vertical' className='text-[1.2rem] text-gray-800' />
                                </motion.button>
                            </span>
                        </View>
                    ))}
                    <View className='mt-4 flex items-center gap-4'>
                        <motion.button
                            className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-blue-500 text-white'
                            whileTap={{ scale: 0.9 }}
                        >
                            <IonIcon name='arrow-back-outline' className='text-[1.2rem] ' />
                        </motion.button>
                        <motion.button
                            className='flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-lg bg-blue-500 text-white'
                            whileTap={{ scale: 0.9 }}
                        >
                            <IonIcon name='arrow-forward-outline' className='text-[1.2rem] ' />
                        </motion.button>
                    </View>
                </View>
            </View>
            <View className='max-w-[22rem] flex-1 flex-col gap-4 border-l border-gray-300 pl-4'>
                <h2 className='text-[1.2rem] font-bold text-blue-600'>Top Product Trending</h2>
                <View className='mt-4 flex h-[40rem] flex-col gap-2 overflow-y-scroll'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                        <View className='flex  cursor-pointer gap-2 rounded-lg border border-blue-500 bg-white p-2 duration-150 hover:bg-gray-100'>
                            <View className='h-16 w-16 rounded-lg'>
                                <img
                                    src='https://i.pinimg.com/564x/e2/02/cf/e202cfe25ea445899b521b24cee3dc5e.jpg'
                                    alt='nev'
                                    className='h-full w-full rounded-lg object-cover'
                                />
                            </View>
                            <View>
                                <p className='text-gray-800'>
                                    Máy bán độ <span>#1</span>
                                </p>
                                <span className='text-[0.8rem] text-gray-600'>1.500.000$</span>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default Store
