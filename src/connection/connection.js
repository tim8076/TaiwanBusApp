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
export const getBusRoutes = (searchText, city) => userRequest.get(`/v2/Bus/Route/City/${city}?format=JSON&$filter=contains(RouteName/Zh_tw, '${searchText}')`);



