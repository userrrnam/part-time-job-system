import { reactive } from 'vue'
export const useConsteEffect = () => {
    const cityList = reactive([
        {
            key: "00",
            name: "全国",
        },
        {
            key: "01",
            name: "上海",
        },
        {
            key: "02",
            name: "深圳",
        },
        {
            key: "03",
            name: "成都",
        },
        {
            key: "04",
            name: "北京",
        },
        {
            key: "05",
            name: "上海",
        },
        {
            key: "06",
            name: "深圳",
        },
        {
            key: "07",
            name: "成都",
        },
        {
            key: "08",
            name: "北京",
        },
        {
            key: "03",
            name: "成都",
        },
        {
            key: "04",
            name: "北京",
        },
        {
            key: "05",
            name: "上海",
        },
        {
            key: "06",
            name: "深圳",
        },
        {
            key: "07",
            name: "成都",
        },
        {
            key: "08",
            name: "北京",
        },
    ]);
    const salarys = reactive([
        {
          value: 'jack',
          label: '2000以内',
        },
        {
          value: 'lucy',
          label: '2000~4000',
        },
        {
          value: 'yiminghe',
          label: '4000以上',
        },
      ]);
      const jobType = reactive([
          {
              value: '01',
              label: '技术'
          },
          {
              value: '02',
              label: '设计'
          }
      ])
    return {
        cityList,
        salarys,
        jobType
    }
}