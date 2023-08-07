import View from 'components/shared/View'
import Section from 'motion/Section'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { routes } from 'configs'
import history from 'redux/store/history'
import { useAppSelector } from 'hooks/useRedux'
import { toast } from 'react-toastify'

type GlobalLayoutProps = {
    children: React.ReactNode
}

const checkPathExistInRoutes = (path: string) => {
    let isExist = false
    routes.forEach((route) => {
        if (route.path === path && route.isPrivate) {
            isExist = true
        }
    })
    return isExist
}

const GlobalLayout: FunctionComponent<GlobalLayoutProps> = ({ children }) => {
    const [isCheckMobile, setIsCheckMobile] = useState(false)

    const [isWidth, setIsWidth] = useState(false)
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    const location = history.location.pathname

    useEffect(() => {
        if (!accessToken && checkPathExistInRoutes(location)) {
            toast.error('Bạn cần đăng nhập để truy cập trang này', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true
            })
            // BACK PAGE
            history.back()
        }
    }, [accessToken, location])

    const handleCheckMobile = () => {
        if (window.innerWidth < 768) {
            setIsCheckMobile(true)
        } else {
            setIsCheckMobile(false)
        }
    }

    useEffect(() => {
        handleCheckMobile()
        window.addEventListener('resize', handleCheckMobile)
        return () => {
            window.removeEventListener('resize', handleCheckMobile)
        }
    }, [])

    if (isCheckMobile) {
        return <div className=' flex min-h-screen items-center justify-center '>Khong ho tro</div>
    }

    return (
        <div className=' flex min-h-screen'>
            <View className=' relative min-w-[22rem] max-w-[22rem] flex-1 '>
                <View className='fixed top-0 h-screen w-[22rem] bg-gray-200  p-2'>
                    <Sidebar />
                </View>
            </View>
            <View className=' flex-1  bg-gray-200 p-2'>
                <View className='min-h-[100vh] rounded-2xl bg-white'>
                    <Header />
                    <View className='mt-4 px-8'>{children}</View>
                </View>
            </View>
        </div>
    )
}

export default GlobalLayout
