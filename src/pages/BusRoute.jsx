import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBusRouteByCity } from "../slice/busSlice"
import { useParams } from "react-router-dom"
import { getCityNameChinese, getCityCenterPoint } from "../tools/cityMap"
import CardRoute from "../components/CardRoute"
import MapComponent from "../components/MapComponent"
import Keyboard from '../components/Keyboard'
import KeyboardTaipei from "../components/KeyboardTaipei"
import useLocalStorage from "../hooks/useLocalStorage"
import ModalFavorite from "../components/ModalFavorite"
import { Modal } from "bootstrap"
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

  // 我的收藏
  const [favoriteRoutes, setFavorites] = useLocalStorage('favoriteBusRoutes', []);
  const favoriteModalRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteSave = (route) => {
    const routeIndex = favoriteRoutes.findIndex(item => {
      return item.RouteID === route.RouteID;
    });
    if (routeIndex < 0) {
      const addedData = [...favoriteRoutes, route];
      setFavorites(addedData);
      setIsFavorite(true);
    } else {
      const filteredData = favoriteRoutes.filter(item => item.RouteID !== route.RouteID);
      setFavorites(filteredData);
      setIsFavorite(false);
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
  return (
    <div>
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
                    <li className="mb-3"
                      key={route.RouteUID}>
                      <CardRoute route={route}
                        favoriteRoutes={favoriteRoutes}
                        handleFavoriteSave={handleFavoriteSave}
                      />
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
      <ModalFavorite
        favoriteModalRef={favoriteModalRef}
        isFavorite={isFavorite}
        closeModal={closeModal}
      />
    </div>
  )
}
