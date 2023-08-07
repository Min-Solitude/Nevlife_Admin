import IonIcon from '@reacticons/ionicons'
import View from 'components/shared/View'

type DetailDoctorProps = {
    close: () => void
    address: string
    avatar: string
    email: string
    evaluate: string
    experience: string
    phoneNumber: string
    role: string
    specialized: string
    username: string
}

const DetailDoctor = ({
    address,
    avatar,
    close,
    email,
    evaluate,
    experience,
    phoneNumber,
    role,
    specialized,
    username
}: DetailDoctorProps) => {
    return (
        <View
            className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[#ffffff95]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={close}
        >
            <View className='flex w-full max-w-[30rem] flex-col items-center gap-4 rounded-lg border border-gray-300 bg-white p-8 shadow-lg'>
                <View className='h-[5rem] w-[5rem] overflow-hidden rounded-full border-[0.2rem] border-blue-500 shadow-md'>
                    <img src={avatar} alt={username} className='h-full w-full object-cover' />
                </View>
                <View className='text-center'>
                    <h1 className='text-[1.4rem] font-bold'>{username}</h1>
                    <span className='text-[0.8rem] text-gray-600'>{email}</span>
                </View>
                <View className='w-full rounded-2xl border border-gray-300 bg-gray-100 p-4 '>
                    <View className='flex items-center gap-2'>
                        <label>Đánh giá: </label>
                        <View className='flex items-center gap-1'>
                            {Array.from({ length: Number(evaluate) }, (_, index) => (
                                <IonIcon key={index} name='star' className='text-yellow-500' />
                            ))}
                        </View>
                    </View>
                    <View>
                        <label>Chuyên khoa:</label>
                        <span>{specialized}</span>
                    </View>
                    <View>
                        <label>Kinh nghiệm:</label>
                        <span>{experience} năm</span>
                    </View>
                </View>
                <View className='w-full rounded-2xl border border-gray-300 bg-gray-100 p-4'>
                    <View>
                        <label>Địa chỉ:</label>
                        <span>{address}</span>
                    </View>
                    <View>
                        <label>Số điện thoại:</label>
                        <span>{phoneNumber}</span>
                    </View>
                    <View>
                        <label>Vai trò:</label>
                        <span>{role}</span>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DetailDoctor
