import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import heartIcon from '../assets/images/icons/carbon_favorite.svg'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBusRouteByCity } from "../slice/busSlice"
import { useParams } from "react-router-dom"
import { getCityNameChinese } from "../tools/cityMap"
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
            <div className="bg-gray-100 p-7">
              <div className="container">
                <ul className="row gx-2 list-unstyled mb-3">
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#E87E7E',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      紅
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#3591C5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      藍
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      1
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      2
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      3
                    </button>
                  </li>
                </ul>
                <ul className="row gx-2 list-unstyled mb-3">
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#5CC1A9',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      綠
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#A86556',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      棕
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      4
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      5
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      6
                    </button>
                  </li>
                </ul>
                <ul className="row gx-2 list-unstyled mb-3">
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#EEA12E',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      橘
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#DEBE4E',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      黃
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      7
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      8
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      9
                    </button>
                  </li>
                </ul>
                <ul className="row gx-2 list-unstyled">
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#888888',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      F
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#888888',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      小
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-light rounded-3"
                      style={{
                        backgroundColor: '#283C43',
                      }}
                      disabled={!searchText}
                      onClick={backSearch}>
                      倒退
                    </button>
                  </li>
                  <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={(e) => searchBusRoute(e)}>
                      0
                    </button>
                  </li>
                   <li className="col">
                    <button type="button"
                      className="w-100 btn py-3 fs-5 lh-sm text-center text-dark rounded-3"
                      style={{
                        backgroundColor: '#D5D5D5',
                      }}
                      onClick={() => setSearchText('')}>
                      清除
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block w-lg-68">
            <img src="https://s3-alpha-sig.figma.com/img/b1df/5d96/06c2967bea45d037558916149aaa825e?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VrGMK8HRvsU4s4jYl~EbzQdzeQdkpvS839QdG4Suhuiwj~CVZFC926AlI68DtXfjtx4VuwKN5sUx2vczedMrSWirpUyhOM6PD9I63kd6LzpOrUhbMUbV~3~5DMX~IQFStEIRBsLKuPsC1y1a2tH3BsdygG19fFnGNDgiVzeM2YFpNqqXUshCiTVdU79zR3PDsjGoLMXBLqMxwNnoH~jqd3HuFqqxANie03A4TashQ9EVMxEEzO-WtoUbdlihRJpne4g0MX0lfF59s27-MYEVk8jDoZsEAYzod6zwlrrJqJWuaMU8h04d48pX02SLAiIfe12V4Em84nK634CaJgKvoQ__" alt=""
            className="w-100 h-100"/>
          </div>
        </div>
      ) : (
        <div className="h-min-body">
          <img src="https://s3-alpha-sig.figma.com/img/b1df/5d96/06c2967bea45d037558916149aaa825e?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VrGMK8HRvsU4s4jYl~EbzQdzeQdkpvS839QdG4Suhuiwj~CVZFC926AlI68DtXfjtx4VuwKN5sUx2vczedMrSWirpUyhOM6PD9I63kd6LzpOrUhbMUbV~3~5DMX~IQFStEIRBsLKuPsC1y1a2tH3BsdygG19fFnGNDgiVzeM2YFpNqqXUshCiTVdU79zR3PDsjGoLMXBLqMxwNnoH~jqd3HuFqqxANie03A4TashQ9EVMxEEzO-WtoUbdlihRJpne4g0MX0lfF59s27-MYEVk8jDoZsEAYzod6zwlrrJqJWuaMU8h04d48pX02SLAiIfe12V4Em84nK634CaJgKvoQ__" alt=""
            className="w-100 h-min-body"/>
        </div>
      )}
    </div>
  )
}
