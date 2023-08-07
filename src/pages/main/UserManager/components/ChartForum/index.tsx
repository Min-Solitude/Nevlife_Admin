import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Area } from '@ant-design/plots'
import http from 'utils/http'

type DataProps = {
    timePeriod: string
    value: number
}

const ChartForum = () => {
    const [data, setData] = useState<DataProps[]>([])

    useEffect(() => {
        asyncFetch()
    }, [])

    const asyncFetch = () => {
        const res = http.get(`/appointment/number-of-clinics-created-per-day`)
        res.then((res) => {
            const data = Object.entries(res.data).map(([timePeriod, value]) => ({
                timePeriod,
                value
            }))

            setData(data as DataProps[])
        }).catch((err) => {
            console.log(err)
        })
    }

    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1]
        }
    }
    return <Area {...config} />
}

export default ChartForum
