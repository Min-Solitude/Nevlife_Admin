export const registerService = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('../../ws.ts')
            console.log('Đăng ký thành công')
        } catch (error) {
            console.log('Bắn thông báo hụt')
        }
    }
}
