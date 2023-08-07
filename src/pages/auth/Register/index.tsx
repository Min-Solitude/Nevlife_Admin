import { motion } from 'framer-motion'

import View from 'components/shared/View'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PayloadRegisterUser, authRegister } from 'redux/reducers'
import { useAppDispatch } from 'hooks/useRedux'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [checkRuleRead, setCheckRuleRead] = useState<boolean>(false)
    const [checkRuleCheck, setCheckRuleCheck] = useState<boolean>(false)
    const [isShowRule, setIsShowRule] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const handleCheckRule = () => {
        if (checkRuleRead === false) {
            toast.error('Chưa đọc mà đòi check. Bỏ xíu thời gian đọc điều khoản đi bạn ơi!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }
        setCheckRuleCheck(!checkRuleCheck)
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        if (checkRuleCheck === false) {
            toast.error('Vui lòng xác nhận điều khoản để đăng ký tài khoản!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        if (!email || !password || !username || !confirmPassword) {
            toast.error('Vui lòng điền đầy đủ thông tin!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        if (!regexEmail.test(email)) {
            toast.error('Email không hợp lệ!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        if (username.length < 8) {
            toast.error('Tên người dùng phải có ít nhất 8 kí tự!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        if (password.length < 8) {
            toast.error('Mật khẩu phải có ít nhất 8 kí tự!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        if (password !== confirmPassword) {
            toast.error('Mật khẩu không khớp!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
            return
        }

        const data: PayloadRegisterUser = {
            email,
            password,
            username
        }

        dispatch(authRegister(data))
    }

    return (
        <View className='flex w-full items-center justify-center md:w-[80%]'>
            <View className=' max-w-[35rem] flex-1 md:border-r md:border-gray-300 '>
                <h1 className='text-[1.4rem] font-bold text-gray-700'>
                    Tham gia cùng nev<span className='text-primary'>life</span>
                </h1>
                <p className='mb-4 mt-2 text-[0.9rem] font-bold text-gray-600'>
                    Bạn đã có tài khoản? &nbsp;
                    <Link to={'/login'} className='text-black underline'>
                        Đăng nhập
                    </Link>
                </p>
                <form className='flex max-w-[30rem] flex-col gap-4' onSubmit={handleRegister}>
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
                        <label htmlFor='username' className='text-[0.8rem] font-bold text-gray-500'>
                            Họ và tên
                        </label>
                        <input
                            type='text'
                            placeholder='Họ và tên'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <View className='flex flex-col gap-1'>
                        <label htmlFor='ConfirmPassword' className='text-[0.8rem] font-bold text-gray-500'>
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type='Password'
                            placeholder='Xác nhận mật khẩu'
                            id='ConfirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-[0.9rem] outline-none placeholder:font-bold focus:bg-white'
                        />
                    </View>
                    <motion.button
                        className='mt-2 rounded-lg bg-gray-900 py-2 text-white hover:bg-gray-800'
                        whileTap={{ scale: 0.95 }}
                    >
                        Đăng ký
                    </motion.button>
                </form>
                <p className='mb-4 mt-8 flex items-center gap-2 text-[0.9rem] font-bold text-gray-600'>
                    <input
                        type='checkbox'
                        className='-translate-y-[0.15rem]'
                        checked={checkRuleCheck}
                        onChange={handleCheckRule}
                    />
                    Xác nhận điều khoản?
                    <button
                        className='cursor-pointer underline'
                        onClick={() => {
                            setIsShowRule(true)
                            toast.dismiss()
                        }}
                    >
                        Điều khoản
                    </button>
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
            {isShowRule && (
                <View
                    className='fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-[#ffffffd3]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <View
                        className='mx-4 max-w-[30rem] rounded-lg border border-gray-300 bg-gray-200 p-4 shadow-xl'
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h1 className='text-[1.4rem] font-bold text-gray-700'>Điều khoản của chúng tôi.</h1>
                        <p className='mt-4'>
                            Website NevLife là một trang web chuyên về lĩnh vực y tế và sức khỏe. Điều kiện của website
                            này thường xuyên được cập nhật để đảm bảo tính chính xác và đáng tin cậy của thông tin được
                            đăng tải trên trang web. Các bài viết trên NevLife được viết bởi các chuyên gia y tế và cập
                            nhật các thông tin mới nhất về các vấn đề liên quan đến sức khỏe, bệnh tật, dinh dưỡng, thể
                            dục thể thao và các chủ đề liên quan đến y học. NevLife cũng cam kết bảo vệ thông tin người
                            dùng và tuân thủ các quy định chung về bảo vệ dữ liệu cá nhân.
                        </p>
                        <motion.button
                            onClick={() => {
                                setIsShowRule(false)
                                setCheckRuleRead(true)
                            }}
                            className='mt-8 w-full rounded-lg bg-slate-900 py-3 font-bold text-white'
                            whileTap={{ scale: 0.95 }}
                        >
                            Đồng ý
                        </motion.button>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Register
