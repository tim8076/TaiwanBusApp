const cityMap = {
  'Taipei': '台北市',
  'NewTaipei': '新北市',
  'Taoyuan': '桃園市',
  'Taichung': '台中市',
  'Tainan': '台南市',
  'Kaohsiung': '高雄市',
};

const cityCenterPoint = {
  'Taipei': [25.033964, 121.564468],
  'NewTaipei': [25.033964, 121.564468],
  'Taoyuan': [24.993628, 121.300979],
  'Taichung': [24.147736, 120.673648],
  'Tainan': [23.141698, 120.251272],
  'Kaohsiung': [22.627278, 120.301435],
};

export const getCityNameChinese = (name) => {
  return cityMap[name];
}

export const getCityCenterPoint = (name) => {
  return cityCenterPoint[name];
}