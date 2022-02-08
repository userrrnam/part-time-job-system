import options from './cascader-address-options'
export function getCityName(code) {
    code = code+'';
    const provincesCode = code?.substr(0, 2);
    const cityCode = code?.substr(0, 4);
    const areasCode = code;
    let cityName = null;
    options.forEach(provinces => {
        if (provinces.value === provincesCode) {
            provinces.children.forEach(citys => {
                if (citys.value == cityCode) {
                    citys.children.forEach(areas => {
                        if (areas.value === areasCode) {
                            cityName = `${provinces.label}/${citys.label}/${areas.label}`
                        }
                    })
                }
            })
        }
    })
    return cityName;
}