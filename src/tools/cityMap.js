const cityMap = {
  'Taipei': '台北市',
  'NewTaipei': '新北市',
  'Taoyuan': '桃園市',
  'Taichung': '台中市',
  'Tainan': '台南市',
  'Kaohsiung': '高雄市',
};

export const getCityNameChinese = (name) => {
  return cityMap[name];
}