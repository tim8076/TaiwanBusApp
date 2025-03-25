import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBusRoutes,
  getBusStopsData,
  getBusRouteInfoData,
  getBusStopsTimeData,
  getBusRealTimeStop,
  getBusRouteOperator,
} from "../connection/connection";

export const busSlice = createSlice({
  name: "bus",
  initialState: {
    busRoutes: [],
    busStops: [],
    busStopsEstimatedTime: [],
    busRouteInfo: [],
    busRealTimePositions: [],
    busOperator: [],
  },
  reducers: {
    setBusRoutes(state, action) {
      if (action.payload.add) {
        state.busRoutes = [...state.busRoutes, ...action.payload.data];
      } else {
        state.busRoutes = action.payload.data;
      }
    },
    setBusStops(state, action) {
      state.busStops = action.payload;
    },
    setBusRouteInfo(state, action) {
      state.busRouteInfo = action.payload;
    },
    setBusRouteTime(state, action) {
      state.busStopsEstimatedTime = action.payload;
    },
    setBusPosition(state, action) {
      state.busRealTimePositions = action.payload;
    },
    setBusOperator(state, action) {
      state.busOperator = action.payload;
    }
  },
});


// 取得指定公車路線
export const getBusRouteByCity = createAsyncThunk(
  'bus/getBusRouteByCity',
  async ({ searchText, city, add }, { dispatch }) => {
    try {
      const res = await getBusRoutes(searchText, city);
      dispatch(setBusRoutes({
        data: res.data,
        add
      }));
    } catch (error) {
      console.log(error);
    }
  },
);

// 取得公車路線站牌資料
export const getBusStops = createAsyncThunk(
  'bus/getBusStops',
  async ({ city, routeName }, { dispatch }) => {
    try {
      const res = await getBusStopsData(city, routeName);
      dispatch(setBusStops(res.data));
    } catch (error) {
      console.log(error);
    }
  },
);

// 取得指定路線預估到站時間資料
export const getBusRouteTime = createAsyncThunk(
  'bus/getBusRouteTime',
  async ({ city, routeName }, { dispatch }) => {
    try {
      const res = await getBusStopsTimeData(city, routeName);
      dispatch(setBusRouteTime(res.data));
    } catch (error) {
      console.log(error);
    }
  },
);

// 取得指定路線公車動態定點資料
export const getBusPosition = createAsyncThunk(
  'bus/getBusPosition',
  async ({ city, routeName }, { dispatch }) => {
    try {
      const res = await getBusRealTimeStop(city, routeName);
      const filterBus = res.data.filter(bus => bus.RouteName.Zh_tw === routeName);
      dispatch(setBusPosition(filterBus));
    } catch (error) {
      console.log(error);
    }
  },
);

// 取得指定路線公車營運資料
export const getBusRouteInfo = createAsyncThunk(
  'bus/getBusRouteInfo',
  async ({ city, routeName }, { dispatch }) => {
    try {
      const res = await getBusRouteInfoData(city, routeName);
      dispatch(setBusRouteInfo(res.data));
    } catch (error) {
      console.log(error);
    }
  },
);

// 取得指定路線公車營運資料
export const getBusOperator= createAsyncThunk(
  'bus/getBusOperator',
  async ({ city }, { dispatch }) => {
    try {
      const res = await getBusRouteOperator(city);
      dispatch(setBusOperator(res.data));
    } catch (error) {
      console.log(error);
    }
  },
);

export const {
  setBusRoutes,
  setBusStops,
  setBusRouteInfo,
  setBusRouteTime,
  setBusPosition,
  setBusOperator,
} = busSlice.actions;
export default busSlice.reducer;