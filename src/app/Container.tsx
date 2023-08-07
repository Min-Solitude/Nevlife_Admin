import React, { FunctionComponent, useEffect } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from 'redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { toast } from 'react-toastify'
import { MessageProps } from 'redux/reducers'

type ContainerProps = {
    children?: React.ReactNode
}

const Container: FunctionComponent<ContainerProps> = ({ children }) => {
    useEffect(() => {
        window.addEventListener('notification', (event: any) => {
            const message = JSON.parse(localStorage.getItem('message') || '[]')

            const newMessage: MessageProps[] = [...message, event.detail]

            const data = JSON.stringify(newMessage)
            localStorage.setItem('message', data)
        })
    }, [])
    return (
        <React.Fragment>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </React.Fragment>
    )
}

export default Container
