export const dict = {
  compIdTypes: [
    {label: '营业执照', value: '11'},
    {label: '组织结构代码', value: '12'},
    {label: '社会信用代码', value: '13'}
  ],
  peopIdTypes: [
    {label: '身份证', value: '01'},
    {label: '护照', value: '02'}
  ],
  custTypeDict: [
    {label: '个人', value: '00'},
    {label: '企业', value: '01'}
  ],
  contractStatus: [
    {label: '无效', value: '00'},
    {label: '有效', value: '01'},
    {label: '结束', value: '02'}
  ],
  payType: [
    {label: '线上支付', value: '00'},
    {label: '线下支付', value: '01'}
  ],
  payMethod: [
    {label: '支付宝', value: 'zf'},
    {label: '微信', value: 'vx'},
    {label: '银行卡', value: 'bank'},
    {label: '其他', value: 'other'}
  ],
  sex: [
    {label: '男', value: '0'},
    {label: '女', value: '1'}
  ],
  accountType: [
    {label: '打款', value: '0'},
    {label: '扣款', value: '1' }
  ],
  roleType:[

  ]
}

export function getDictLable(type, value) {
  if (dict[type] != null) {
    for (let i = 0; i < dict[type].length; i++) {
      if (dict[type][i].value == value) {
        return dict[type][i].label;
      }
    }
  }
}

export function getDictByType(type) {
  if (dict[type] == null) {
    return [];
  }
  return dict[type];
}
