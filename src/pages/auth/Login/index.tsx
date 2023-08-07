import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import View from 'components/shared/View'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { authLogin } from 'redux/reducers'
import history from 'redux/store/history'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()
    const checkAccessToken = useAppSelector((state) => state.auth.accessToken)

    useEffect(() => {
        if (checkAccessToken) {
            history.push('/')
        }
    }, [checkAccessToken])

    const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ thông tin')
            return
        }

        if (!regexEmail.test(email)) {
            toast.error('Email không hợp lệ')
            return
        }

        const data = {
            email,
            password
        }

        dispatch(authLogin(data))
    }

    return (
        <View className='flex w-full items-center justify-center md:w-[80%]'>
            <View className=' max-w-[35rem] flex-1 md:border-r md:border-gray-300 '>
                <h1 className='text-[1.4rem] font-bold text-gray-700'>
                    Chào mừng đến nev<span className='text-primary'>life</span>
                </h1>
                <p className='mb-4 mt-2 text-[0.9rem] font-bold text-gray-600'>
                    Bạn chưa có tài khoản? &nbsp;
                    <Link to={'/register'} className='text-black underline'>
                        Đăng ký
                    </Link>
                </p>
                <form className='flex max-w-[30rem] flex-col gap-4' onSubmit={handleLogin}>
                    <View className='flex flex-col gap-1'>
                        <label htmlFor='Email' className='text-[0.8rem] font-bold text-gray-500'>
                            Email
                        </label>
                        <input
                            type='email'
                            placeholder='Email'
                            id='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-[0.9rem] outline-none placeholder:font-bold focus:bg-white'
                        />
                    </View>
                    <View className='flex flex-col gap-1'>
                        <label htmlFor='Password' className='text-[0.8rem] font-bold text-gray-500'>
                            Mật khẩu
                        </label>
                        <input
                            type='Password'
                            placeholder='Mật khẩu'
                            id='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-[0.9rem] outline-none placeholder:font-bold focus:bg-white'
                        />
                    </View>
                    <motion.button
                        className='mt-2 rounded-lg bg-gray-900 py-2 text-white hover:bg-gray-800'
                        whileTap={{ scale: 0.95 }}
                    >
                        Đăng nhập
                    </motion.button>
                </form>
                <p className='mb-4 mt-8 text-[0.9rem] font-bold text-gray-600'>
                    Quên mật khẩu?
                    <Link to={'/forgot-password'} className='text-black underline'>
                        Lấy lại mật khẩu
                    </Link>
                </p>
            </View>
            <View className='flex hidden h-full max-w-[35rem] flex-1 items-center justify-center  md:flex'>
                <View className='h-[15rem] w-[25rem] rounded-lg shadow-2xl'>
                    <img
                        src='https://www.campsite.design/_next/image?url=%2Fimg%2Fhome%2Fannotations.png&w=640&q=75'
                        alt='nev'
                        className='h-full w-full object-cover'
                    />
                </View>
            </View>
        </View>
    )
}

export default Login
