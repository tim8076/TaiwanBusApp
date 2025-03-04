import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import heartIcon from '../assets/images/icons/carbon_favorite.svg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBusRouteByCity } from "../slice/busSlice"
import { useParams } from "react-router-dom"
import { getCityNameChinese, getCityCenterPoint } from "../tools/cityMap"
import MapComponent from "../components/MapComponent"
import Keyboard from '../components/Keyboard'
import KeyboardTaipei from "../components/KeyboardTaipei"
export default function BusRoute() {
  const [isMapShow, setIsMapShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { busRoutes } = useSelector((state) => state.bus);
  const { city } = useParams();
  const dispatch = useDispatch();
  const searchBusRoute = (e) => {
    const text = e.target.textContent;
    if (isNaN(text)) {
      setSearchText(text);
    } else {
      setSearchText(pre => pre + text);
    }
  }

  const backSearch = () => {
    setSearchText(searchText.slice(0, -1));
  }

  useEffect(() => {
    if (searchText) {
      if (city === 'Taipei') {
        (async () => {
          await dispatch(getBusRouteByCity({ searchText, city }));
          await dispatch(getBusRouteByCity({ searchText, city: 'NewTaipei', add: true }));
        })();
      } else {
        dispatch(getBusRouteByCity({ searchText, city }));
      }
    }
  }, [searchText, dispatch, city]);

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
            <div className="py-4 px-5">
              <input type="text"
                value={searchText}
                readOnly
                className="form-control rounded-lg mb-5"
                placeholder="請輸入公車路線" />
              <ul className="list-unstyled overflow-y-scroll h-keyboard">
                {(searchText && busRoutes.length > 0) && busRoutes.map(route => {
                  return (
                    <li className="px-3 mb-3"
                      key={route.RouteUID}>
                      <NavLink to="/"
                        className="d-block">
                        <div className="d-flex justify-content-between mb-1">
                          <h2 className="fs-1">
                            { route.RouteName?.Zh_tw }
                          </h2>
                          <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                        </div>
                        <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                          <h3 className="fs-5">
                            {route.DepartureStopNameZh} - {route.DestinationStopNameZh}
                          </h3>
                          <p className="fs-5">{getCityNameChinese(route.City)}</p>
                        </div>
                      </NavLink>
                    </li>
                  )
                })}
                {(searchText && busRoutes.length === 0) && (
                  <p className="text-center py-5">查無路線資料，請試試其他路線</p>
                )}
                { !searchText && (
                  <p className="text-center py-5">請透過下方鍵盤查詢路線</p>
                )}
              </ul>
            </div>
            <div className="bg-gray-100 py-7 p-md-7">
              { city === 'Taipei' ? (
                <KeyboardTaipei searchBusRoute={searchBusRoute}
                  searchText={searchText}
                  backSearch={backSearch}
                  setSearchText={setSearchText}/>
              ) : (
                <Keyboard searchBusRoute={searchBusRoute}
                  searchText={searchText}
                  backSearch={backSearch}
                  setSearchText={setSearchText}/>
              )}
            </div>
          </div>
          <div className="d-none d-lg-block w-lg-68">
            <MapComponent centerPoint={getCityCenterPoint(city)}/>
          </div>
        </div>
      ) : (
        <div className="h-body d-lg-none">
          <MapComponent centerPoint={getCityCenterPoint(city)}/>
        </div>
      )}
    </div>
  )
}
