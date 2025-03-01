import { NavLink } from "react-router-dom"
import mapIcon from '../assets/images/icons/bi_map.svg'
import heartIcon from '../assets/images/icons/carbon_favorite.svg'
import { useState } from "react"
export default function BusRoute() {
  const [isMapShow, setIsMapShow] = useState(false);
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
                台北市
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
                className="form-control rounded-lg mb-5"
                placeholder="請輸入公車路線" />
              <ul className="list-unstyled overflow-y-scroll h-keyboard">
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
                <li className="px-3 mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <h2 className="fs-1">30 延</h2>
                    <img src={heartIcon} alt="heartIcon" width={20} height={20}/>
                  </div>
                  <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
                    <h3 className="fs-5">
                      台中區監理所 - 台中火車站
                    </h3>
                    <p className="fs-5">台中</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-7">
              <div className="container">
                <ul className="row gap-3 list-unstyled mb-3">
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#E87E7E',
                    }}>
                    紅
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#3591C5',
                    }}>
                    藍
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    1
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    2
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    3
                  </li>
                </ul>
                <ul className="row gap-3 list-unstyled mb-3">
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#5CC1A9',
                    }}>
                    綠
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#A86556',
                    }}>
                    棕
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    4
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    5
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    6
                  </li>
                </ul>
                <ul className="row gap-3 list-unstyled mb-3">
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#EEA12E',
                    }}>
                    橘
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#DEBE4E',
                    }}>
                    黃
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    7
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    8
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    9
                  </li>
                </ul>
                <ul className="row gap-3 list-unstyled">
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#888888',
                    }}>
                    F
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#888888',
                    }}>
                    小
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-light rounded-3"
                    style={{
                      backgroundColor: '#283C43',
                    }}>
                    *
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    0
                  </li>
                  <li className="col cursor-pointer py-3 fs-5 lh-sm text-center text-dark rounded-3"
                    style={{
                      backgroundColor: '#D5D5D5',
                    }}>
                    9
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
