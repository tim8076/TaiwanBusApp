import { useSearchParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusRouteInfo,
  getBusOperator,
} from "../slice/busSlice";
import { useEffect } from "react";

export default function BusInfo() {
  const [searchParams, setsearchParams] = useSearchParams();
  const city = searchParams.get('city');
  const routeName = searchParams.get('routeName');
  const dispatch = useDispatch();
  const {
    busOperator,
    busRouteInfo,
  } = useSelector((state) => state.bus);
  const busInfo = busRouteInfo[0];
  const busTimeData = busInfo?.SubRoutes[0];
  const busOperatorInfo = busOperator.filter(operator => {
    return operator.OperatorID === busInfo.Operators[0].OperatorID;
  })
  console.log(busInfo);

  useEffect(() => {
    dispatch(getBusRouteInfo({ city, routeName }));
    dispatch(getBusOperator({ city }));
  }, [city, routeName, dispatch]);
  return (
    <>
      <div className="bg-gray-300 py-2 py-lg-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <NavLink to="/">
                  首頁
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                路線資料
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="h-min-body container py-3 py-md-6">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="p-2 bg-primary text-light mb-3">
              { busInfo?.RouteName?.Zh_tw }
            </h1>
            <h2 className="mb-3">
              { busInfo?.DepartureStopNameZh }-{ busInfo?.DestinationStopNameZh }
            </h2>
            <p className="mb-3">
              { busInfo?.Operators[0]?.OperatorName?.Zh_tw }: { busOperatorInfo[0]?.OperatorPhone }
            </p>
            <p className="mb-3">
              路線簡圖:
              <a href={busInfo?.RouteMapImageUrl}
                className="btn p-0 text-primary ms-3"
                target="_blank"
                >
                點我開啟外部連結
              </a>
            </p>
            <div className="p-3 border border-2 border-gray-600">
              <h3 className="mb-1 text-secondary">票價資訊:</h3>
              <p className="mb-6">收費方式: { busInfo?.TicketPriceDescriptionZh }</p>
              <div className="mb-6">
                <h3 className="mb-1 text-secondary">平日發車資訊:</h3>
                <ul className="list-unstyled">
                  <li>
                    首班車: { busTimeData?.FirstBusTime }
                  </li>
                  <li>
                    末班車: { busTimeData?.LastBusTime }
                  </li>
                  <li>
                    尖峰班距: 12-15分
                  </li>
                  <li>
                    離峰班距: 20-30分
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="mb-1 text-secondary">假日發車資訊:</h3>
                <ul className="list-unstyled">
                  <li>
                    首班車: { busTimeData?.HolidayFirstBusTime }
                  </li>
                  <li>
                    末班車: { busTimeData?.HolidayLastBusTime }
                  </li>
                  <li>
                    尖峰班距: 12-15分
                  </li>
                  <li>
                    離峰班距: 20-30分
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
