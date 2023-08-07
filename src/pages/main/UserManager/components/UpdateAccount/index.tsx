import View from 'components/shared/View'
import { useAppDispatch } from 'hooks/useRedux'
import { FormEvent, useState } from 'react'
import { updatePermission } from 'redux/reducers/user'

type UpdateAccountProps = {
    close: () => void
    _id: string
    status: string
    role: string
}

const UpdateAccount = ({ close, _id, status, role }: UpdateAccountProps) => {
    const [statusUpdate, setStatusUpdate] = useState(status)
    const [roleUpdate, setRoleUpdate] = useState(role)
    const dispatch = useAppDispatch()

    const handleUpdateAcocunt = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            _id,
            status: statusUpdate,
            role: roleUpdate
        }

        dispatch(updatePermission(data))
        close()
    }

    return (
        <View
            className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[#ffffff90]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <form
                className='flex w-full max-w-[30rem] flex-col items-center gap-4 rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-lg'
                onSubmit={handleUpdateAcocunt}
            >
                <h1 className='text-[1.2rem] text-blue-500'>Cập nhật tài khoản</h1>
                <View className='flex w-full flex-col  gap-2 '>
                    <label className='text-[0.8rem] text-gray-500'>Trạng thái</label>
                    <select
                        className='h-9 w-full w-full rounded-lg border border-gray-300 bg-white'
                        value={statusUpdate}
                        onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                        <option value='active'>Hoạt động</option>
                        <option value='inactive'>Không hoạt động</option>
                    </select>
                </View>
                <View className='flex w-full  flex-col gap-2'>
                    <label className='text-[0.8rem] text-gray-500'>Quyền hạn</label>
                    <select
                        className='h-9 w-full rounded-lg border border-gray-300 bg-white'
                        value={roleUpdate}
                        onChange={(e) => setRoleUpdate(e.target.value)}
                    >
                        <option value='user'>Người dùng</option>
                        <option value='doctor'>Bác sĩ</option>
                    </select>
                </View>
                <View className='flex items-center gap-4'>
                    <button
                        className='rounded-lg border border-red-500 bg-white px-8 py-2 text-red-500 duration-200 hover:bg-red-500 hover:text-white'
                        onClick={close}
                        type='button'
                    >
                        Hủy
                    </button>
                    <button
                        className='rounded-lg border border-blue-500 bg-white px-8 py-2 text-blue-500 duration-200 hover:bg-blue-500 hover:text-white'
                        type='submit'
                    >
                        Cập nhật
                    </button>
                </View>
            </form>
        </View>
    )
}

export default UpdateAccount
