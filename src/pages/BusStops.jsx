import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import linkIcon from '../assets/images/icons/ant-design_link-outlined.svg'
import heartIcon from '../assets/images/icons/carbon_favorite.svg'
import heartIconFill from '../assets/images/icons/carbon_favorite-filled.svg'
import infoIcon from '../assets/images/icons/info-icon.svg'
import arrowLeftIcom from '../assets/images/icons/arrow-left.svg'
import { useEffect, useMemo, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCityNameChinese } from "../tools/cityMap"
import MapBusStops from '../components/MapBusStops';
import { Link, useSearchParams } from "react-router-dom"
import { showBusStatus } from "../tools/tools"
import { Modal } from "bootstrap"
import ModalFavorite from "../components/ModalFavorite"
import {
  getBusStops,
  getBusRouteInfo,
  getBusRouteTime,
  getBusPosition,
} from "../slice/busSlice"
import useLocalStorage from "../hooks/useLocalStorage"
import { alertInfo, alertError } from "../tools/sweetAlert"
export default function BusRoute() {
  const [isMapShow, setIsMapShow] = useState(false);
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  const routeName = searchParams.get('routeName');
  const dispatch = useDispatch();

  // 取得路線站牌資料
  const {
    busStops,
    busRouteInfo,
    busStopsEstimatedTime,
    busRealTimePositions,
  } = useSelector((state) => state.bus);
  const [routeDirection, setRouteDirection] = useState(0);
  const changeRouteDirection = (direction) => {
    setRouteDirection(direction);
    setSelectBusStop('');
  }
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

  const currentStopsWithBusPosition = useMemo(() => {
    return currentStops.map((stop) => {
      const bus = busRealTimePositions.find(bus => bus.StopID === stop.StopID);
      if (!bus) return stop;
      return {
        ...stop,
        PlateNumb: bus.PlateNumb,
      } 
    });
  }, [currentStops, busRealTimePositions]);
  const routeInfo = busRouteInfo.find(route => route.RouteID === busStops[0]?.RouteID) || {};
  
  const getBusData = ({ city, routeName }) => {
    dispatch(getBusStops({ city, routeName }));
    dispatch(getBusRouteTime({ city, routeName }));
    dispatch(getBusPosition({ city, routeName }));
  }

  useEffect(() => {
    getBusData({ city, routeName });
    dispatch(getBusRouteInfo({ city, routeName }));
  }, [city, routeName, dispatch]);

  // 每20秒重新取得資料
  let [countTime, setCountTime] = useState(20);
  const updateBusData = () => {
    setCountTime(20);
    getBusData({ city, routeName });
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (countTime === 0) {
    //     setCountTime(20);
    //     getBusData({ city, routeName });
    //   } else {
    //     setCountTime(countTime - 1);
    //   }
    // }, 1000);
    // return () => clearInterval(interval);
  }, [countTime]);

  // 選取站牌功能
  const [selectBusStop, setSelectBusStop] = useState('');

  // 收藏功能
  const [favoriteRoutes, setFavorites] = useLocalStorage('favoriteBusRoutes', []);
  const favoriteModalRef = useRef(null);
  const isFavorite = favoriteRoutes.find(item => item.RouteID === routeInfo.RouteID);
  const heartIconSrc = isFavorite ? heartIconFill : heartIcon; 
  
  const handleFavoriteSave = (route) => {
    const routeIndex = favoriteRoutes.findIndex(item => {
      return item.RouteID === route.RouteID;
    });
    if (routeIndex < 0) {
      const addedData = [...favoriteRoutes, route];
      setFavorites(addedData);
    } else {
      const filteredData = favoriteRoutes.filter(item => item.RouteID !== route.RouteID);
      setFavorites(filteredData);
    }
    openModal();
  };
  const openModal = () => {
    favoriteModalRef.current.show();
  }
  const closeModal = () => {
    favoriteModalRef.current.hide();
  }
  useEffect(() => {
    favoriteModalRef.current = new Modal(favoriteModalRef.current);
  }, []);

  const copyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alertInfo('複製連結成功');
    } catch (error) {
      alertError(error);
    }
  }
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
          <ul className="list-unstyled d-flex align-items-center">
            <li className="d-none d-md-block me-3">
              <button type="button"
                className="btn p-0"
                onClick={copyLink}>
                <img src={linkIcon}
                  className="me-1"
                  alt="linkIcon"
                  width={16}
                  height={16} />
                複製連結
              </button>
            </li>
            <li className="me-3 me-md-0">
              <NavLink className="d-flex align-items-center"
                to={`/bus-info?city=${city}&routeName=${routeName}`}>
                <img src={infoIcon}
                  className="me-1"
                  alt="infoIcon"
                  width={16}
                  height={16}/>
                路線資訊
              </NavLink>
            </li>
            <li>
              <button type="button"
                className="btn p-0 d-flex align-items-center d-lg-none"
                onClick={() => setIsMapShow(!isMapShow)}>
                <img src={mapIcon} alt="mapIcon" width={16} height={16}/>
                <span className="ms-1">地圖</span>
              </button>
            </li>
          </ul>
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
                  className="btn p-0"
                  onClick={() => handleFavoriteSave(routeInfo)}>
                  <img src={heartIconSrc} alt="heartIcon" width={20} height={20} />
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
                  onClick={() => changeRouteDirection(0)}>
                  往 { routeInfo.DestinationStopNameZh }
                </button>
                <button type="button"
                  className={`btn py-3 w-50 rounded-0 rounded-top ${routeDirection === 1 ? 'bg-primary text-light' : 'bg-gray-500 text-dark'}`}
                  onClick={() => changeRouteDirection(1)}>
                  往 { routeInfo.DepartureStopNameZh }
                </button>
              </div>
              <div className="py-6 px-5 h-routes overflow-y-scroll">
                <ul className="list-unstyled">
                  { currentStopsWithBusPosition.map(stop => {
                    const isSelect = selectBusStop === stop.StopID;
                    return (
                      <li className={`bus-stop-item py-4 d-flex align-items-center border-bottom border-gray-500 bg-gray-300-hover transition-base ${showBusStatus(stop.time, stop.status).class} position-relative ${isSelect ? 'bg-gray-300' : ''}`}
                        key={stop.StopID}>
                        <button type="button"
                          className="btn p-0 stretched-link"
                          onClick={() => setSelectBusStop(stop.StopID)}>
                        </button>
                        <div className="time p-1 px-4 rounded-3 text-light me-4 w-25 fs-6 fs-md-5 text-center">
                          { showBusStatus(stop.time, stop.status).text }
                        </div>
                        <div className="w-75 d-flex justify-content-between pe-3">
                          <h3 className="title fw-normal">
                            {stop.StopName?.Zh_tw}
                          </h3>
                          { stop.PlateNumb && (
                            <p className="fs-6 text-secondary fw-bold">
                              { stop.PlateNumb }
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="py-4 px-5 d-flex justify-content-between border-top border-gray-500">
                <p>{countTime} 秒後更新</p>
                <button type="button"
                  className="btn p-0"
                  onClick={updateBusData}>
                  立即更新
                </button>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block w-lg-68">
            { currentStops.length > 0 && (
              <MapBusStops
                key={routeDirection}
                currentStops={currentStops}
                busRealTimePositions={busRealTimePositions}
                selectBusStop={selectBusStop}/>
            )}
          </div>
        </div>
      ) : (
        <div className="h-body d-lg-none">
          { currentStops.length > 0 && (
            <MapBusStops
              key={routeDirection}
              currentStops={currentStops}
              busRealTimePositions={busRealTimePositions}
              selectBusStop={selectBusStop}/>
          )}
        </div>
      )}
      <ModalFavorite
        favoriteModalRef={favoriteModalRef}
        isFavorite={isFavorite}
        closeModal={closeModal}
      />
    </div>
  )
}
