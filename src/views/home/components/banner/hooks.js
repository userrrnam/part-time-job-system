import { reactive } from 'vue'
export const useConsteEffect = () => {
    const jobType = reactive([{
            key: '00',
            value: '不限'
        }, {
            key: '01',
            value: '计算机/网络/技术类'
        },
        {
            key: '02',
            value: '销售类'
        },
        {
            key: '03',
            value: '电子/电器/通信技术类'
        },
        {
            key: '03',
            value: '电气/能源/动力类'
        },
        {
            key: '04',
            value: '金融类(银行/基金/证券/期货/投资)'
        },
        {
            key: '05',
            value: '建筑/房地产/装饰装修/物业管理类'
        },
        {
            key: '06',
            value: '技工类',
        },
        {
            key: '07',
            value: '海洋类'
        },
        {
            key: '08',
            value: '财务/审计/统计类'
        },
        {
            key: '09',
            value: '教育/培训类'
        },
        {
            key: '10',
            value: '商业零售类'
        },
        {
            key: '11',
            value: '销售类'
        }

    ])
    return {
        jobType
    }
}