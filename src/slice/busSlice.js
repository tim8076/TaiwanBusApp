import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBusRoutes } from "../connection/connection";

export const busSlice = createSlice({
  name: "bus",
  initialState: {
    busRoutes: [],
  },
  reducers: {
    setBusRoutes(state, action) {
      console.log(action)
      if (action.payload.add) {
        state.busRoutes = [...state.busRoutes, ...action.payload.data];
      } else {
        state.busRoutes = action.payload.data;
      }
    },
  },
});

// 取得指定公車路線
export const getBusRouteByCity = createAsyncThunk(
  'bus/getBusRouteByCity',
  async ({ searchText, city, add }, { dispatch }) => {
    console.log(searchText, city)
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

export const { setBusRoutes } = busSlice.actions;
export default busSlice.reducer;