import IonIcon from '@reacticons/ionicons'
import View from 'components/shared/View'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { NavLink } from 'react-router-dom'
import { AuthAction } from 'redux/reducers'

const Sidebar = () => {
    const disptach = useAppDispatch()
    const roleAccount = useAppSelector((state) => state.auth.user.role)

    const handleLogout = () => {
        disptach(AuthAction.handleLogout())
    }
    return (
        <View
            className='flex h-full flex-col gap-4 rounded-2xl bg-white p-4 '
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <View className='flex h-[4rem] items-center '>
                <span className='font-popins text-[1.4rem] font-[700] text-gray-800'>Admin</span>
            </View>
            <View className='flex items-center gap-4'>
                <View className='h-[4rem] w-[4rem] rounded-2xl border border-blue-600 bg-white p-1'>
                    <img
                        src='https://scontent.fsgn12-1.fna.fbcdn.net/v/t39.30808-1/354998400_1617527355423047_9222681281250878950_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=AphrhVGqJrcAX-paBZN&_nc_ht=scontent.fsgn12-1.fna&oh=00_AfAtqCb0_mMW-0XtbL6NyPLV4W-KatQFvrsyziVaBaVxFg&oe=64C67FE9'
                        alt='nev'
                        className='h-full w-full rounded-2xl object-cover'
                    />
                </View>
                <span className='text-[1.2rem] font-bold text-gray-700'>Nevsolit</span>
            </View>
            <nav className='mt-4 flex flex-col gap-4'>
                <label className='mb-2 text-gray-700'>MENU</label>
                <NavLink
                    to='/'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='grid-outline' className='text-[1.2rem]' />
                    <span>Bảng điều khiển</span>
                </NavLink>
                {roleAccount === 'admin' && (
                    <NavLink
                        to='/user-manager'
                        className={(nav) =>
                            nav.isActive
                                ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                                : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                        }
                    >
                        <IonIcon name='person-outline' className='text-[1.2rem]' />
                        <span>Quản lý tài khoản</span>
                    </NavLink>
                )}
                <NavLink
                    to='/medical-manager'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='medical-outline' className='text-[1.2rem]' />
                    <span>Quản lý phòng khám </span>
                </NavLink>
                <NavLink
                    to='/forum-manager'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='newspaper-outline' className='text-[1.2rem]' />
                    <span>Forum</span>
                </NavLink>
                <NavLink
                    to='/bill-manager'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='calendar-outline' className='text-[1.2rem]' />
                    <span>Quản lý lịch khám</span>
                </NavLink>
            </nav>
            <nav className='mt-4 flex flex-col gap-4'>
                <label className='mb-2 text-gray-700'>HELP</label>
                <NavLink
                    to='/analytics'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='analytics-outline' className='text-[1.2rem]' />
                    <span>Analytics</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                >
                    <IonIcon name='log-out-outline' className='text-[1.2rem]' />
                    <span>Logout</span>
                </button>
                <NavLink
                    to='/settings'
                    className={(nav) =>
                        nav.isActive
                            ? 'flex items-center gap-4 rounded-lg bg-blue-500  px-6 py-3 text-white duration-300'
                            : 'flex items-center gap-4 rounded-lg py-3 text-gray-700 duration-300 hover:bg-blue-500 hover:px-6 hover:text-white'
                    }
                >
                    <IonIcon name='settings-outline' className='text-[1.2rem]' />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </View>
    )
}

export default Sidebar
