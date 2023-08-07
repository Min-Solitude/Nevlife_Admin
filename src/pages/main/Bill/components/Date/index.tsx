import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const { RangePicker } = DatePicker

const dateFormat = 'YYYY/MM/DD'
const weekFormat = 'MM/DD'
const monthFormat = 'YYYY/MM'

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

const customFormat: DatePickerProps['format'] = (value) => `custom format: ${value.format(dateFormat)}`

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
    `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value).endOf('week').format(weekFormat)}`

const Date: React.FC = () => {
    return (
        <Space direction='vertical' size={12}>
            <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
        </Space>
    )
}

export default Date
