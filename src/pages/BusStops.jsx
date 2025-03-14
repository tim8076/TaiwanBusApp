import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import heartIcon from '../assets/images/icons/carbon_favorite.svg'
import arrowLeftIcom from '../assets/images/icons/arrow-left.svg'
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCityNameChinese, getCityCenterPoint } from "../tools/cityMap"
import MapBusStops from '../components/MapBusStops';
import { Link, useSearchParams } from "react-router-dom"
import { showBusStatus } from "../tools/tools"
import {
  getBusStops,
  getBusRouteInfo,
  getBusRouteTime
} from "../slice/busSlice"
export default function BusRoute() {
  const [isMapShow, setIsMapShow] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();
  const city = searchParams.get('city');
  const routeName = searchParams.get('routeName');
  const dispatch = useDispatch();

  // 取得路線站牌資料
  const {
    busStops,
    busRouteInfo,
    busStopsEstimatedTime,
  } = useSelector((state) => state.bus);
  const [routeDirection, setRouteDirection] = useState(0);
  const currentStops = useMemo(() => {
    const stops = busStops.filter(stop => {
      return stop.Direction === routeDirection
        && stop.RouteName.Zh_tw === routeName;
    })[0] || [];
    const stopsWithTime = stops.Stops?.map(stop => {
      if (!busStopsEstimatedTime.length) return stop;
      const timeItem = busStopsEstimatedTime.find(item => stop.StopID === item.StopID);
      return {
        ...stop,
        time: timeItem?.EstimateTime,
        status: timeItem?.StopStatus,
      }
    })
    return stopsWithTime ? stopsWithTime : [];
  }, [busStops, routeDirection, routeName, busStopsEstimatedTime]);
  const routeInfo = busRouteInfo.find(route => route.RouteID === busStops[0]?.RouteID) || {};
  console.log(currentStops)
  
  useEffect(() => {
    dispatch(getBusStops({ city, routeName }));
    dispatch(getBusRouteInfo({ city, routeName }));
    dispatch(getBusRouteTime({ city, routeName }))
  }, [city, routeName, dispatch]);

  return (
    <div className="">
      <div className="bg-gray-300 py-2 py-lg-3">
        <div className="container d-flex justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <NavLink to="/">
                  首頁
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                { city === 'Taipei' ? '台北市/新北市' : getCityNameChinese(city) }
              </li>
            </ol>
          </nav>
          <button type="button"
            className="btn p-0 d-flex align-items-center d-lg-none"
            onClick={() => setIsMapShow(!isMapShow)}>
            <img src={mapIcon} alt="mapIcon" width={16} height={16}/>
            <span className="ms-1">地圖</span>
          </button>
        </div>
      </div>
      { !isMapShow ? (
        <div className="d-lg-flex">
          <div className="d-flex flex-column w-lg-32">
            <div className="py-2 px-3 mb-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Link to="/"
                  className="d-flex align-items-center">
                  <img src={arrowLeftIcom} alt="arrowLeftIcom" />
                  <span className="ms-1">返回搜尋</span>
                </Link>
                <button type="button"
                  className="btn p-0">
                  <img src={heartIcon} alt="heartIcon" width={20} height={20} />
                </button>
              </div>
              <h1 className="fs-lg fw-bold text-center mb-1">
                { routeInfo.RouteName?.Zh_tw }
              </h1>
              <h2 className="fs-3 text-center">
                { routeInfo.RouteName?.En }
              </h2>
            </div>
            <div>
              <div className="d-flex">
                <button type="button"
                  className={`btn py-3 w-50 rounded-0 rounded-top ${routeDirection === 0 ? 'bg-primary text-light' : 'bg-gray-500 text-dark'}`}
                  onClick={() => setRouteDirection(0)}>
                  往 { routeInfo.DestinationStopNameZh }
                </button>
                <button type="button"
                  className={`btn py-3 w-50 rounded-0 rounded-top ${routeDirection === 1 ? 'bg-primary text-light' : 'bg-gray-500 text-dark'}`}
                  onClick={() => setRouteDirection(1)}>
                  往 { routeInfo.DepartureStopNameZh }
                </button>
              </div>
              <div className="py-6 px-5 h-routes overflow-y-scroll">
                <ul className="list-unstyled">
                  { currentStops.map(stop => {
                    return (
                      <li className={`bus-stop-item py-4 d-flex align-items-center border-bottom border-gray-500 ${showBusStatus(stop.time, stop.status).class}`}
                        key={stop.StopID}>
                        <div className="time py-1 px-4 rounded-3 text-light me-4 w-25 fs-5 text-center">
                          { showBusStatus(stop.time, stop.status).text }
                        </div>
                        <h3 className="title fw-normal w-75">
                          {stop.StopName?.Zh_tw}
                        </h3>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="py-4 px-5 d-flex justify-content-between border-top border-gray-500">
                <p>20秒後更新</p>
                <button type="button"
                  className="btn p-0">
                  立即更新
                </button>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block w-lg-68">
            { currentStops.length > 0 && (
              <MapBusStops currentStops={currentStops} />
            )}
          </div>
        </div>
      ) : (
        <div className="h-body d-lg-none">
          { currentStops.length > 0 && (
            <MapBusStops currentStops={currentStops} />
          )}
        </div>
      )}
    </div>
  )
}
