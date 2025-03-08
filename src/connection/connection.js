import axios from "axios";
export const getAuthorizationHeader =  async () => {
  const parameter = {
    grant_type:"client_credentials",
    client_id: import.meta.env.VITE_API_CLIENT_ID,
    client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
  };
  const auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  try {
    const res = await axios.post(auth_url, parameter, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, expires_in } = res.data;
    document.cookie = `tdxApiToken=${access_token}; Max-Age=${expires_in}; path=/`;
  } catch(error) {
    console.log(error);
  }
}

const userRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // 預設Url
  headers: {
    'Content-Type': 'application/json',
  }, // headers資訊
});

export const setRequestToken = (token) => {
  userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// 可以統一管理 API Call

// 取得指定縣市公車路線資料
export const getBusRoutes = (searchText, city) => userRequest.get(`/v2/Bus/Route/City/${city}?format=JSON&$filter=contains(RouteName/Zh_tw, '${searchText}')`);

// 取得指定路線站牌資料
export const getBusStopsData = (city, routeName) => userRequest.get(`/v2/Bus/DisplayStopOfRoute/City/${city}/${routeName}?format=JSON`);

// 取得指定路線站牌到站時間資料
export const getBusStopsTimeData = (city, routeName) => userRequest.get(`/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}?format=JSON`);

// 取得指定路線詳細資料(起始終點站、營運公司、收費方式等)
export const getBusRouteInfoData = (city, routeName) => userRequest.get(`/v2/Bus/Route/City/${city}/${routeName}?format=JSON`);





