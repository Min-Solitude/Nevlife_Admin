import { Column } from '@ant-design/plots'
import { useEffect, useState } from 'react'
import http from 'utils/http'

type DataProps = {
    type: string
    sales: number
}

const ChartInteract = () => {
    const [data, setData] = useState<DataProps[]>([])

    const asyncFetch = () => {
        const res = http.get<Record<string, number>>(`/appointment/number-of-clinics-created-per-day`)
        res.then((res) => {
            const data = Object.entries(res.data).map(([date, sales]) => ({
                type: date,
                sales
            }))
            setData(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        asyncFetch()
    }, [])

    const config: any = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6
            }
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false
            }
        },
        meta: {
            type: {
                alias: '类别'
            },
            sales: {
                alias: 'Số phòng'
            }
        }
    }
    return <Column {...config} />
}

export default ChartInteract
