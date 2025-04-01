import { NavLink } from "react-router-dom"
import mainLogo from '../assets/images/main-logo.svg'
import menuIcon from '../assets/images/icons/bx_bx-menu.svg'
import languageLogo from '../assets/images/icons/iconoir_language.svg'
export default function Header() {
  return (
    <>
      <div className="header p-3 py-lg-5 container d-flex justify-content-between">
        <NavLink to="/">
          <img className="header__logo" src={mainLogo} alt="main-logo" />
        </NavLink>
        <ul className="list-unstyled d-flex align-items-center d-lg-none">
          <li>
            <button type="button"
              className="btn p-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu">
              <img src={menuIcon} alt="menuIcon" />
            </button>
          </li>
        </ul>
        <ul className="list-unstyled align-items-center d-none d-lg-flex">
          <li className="me-4 me-lg-12">
            <NavLink to="/bus-route/Taipei">
              搜尋路線
            </NavLink>
          </li>
          <li className="me-4 me-lg-12">
            <NavLink to="/bus-favorites">
              我的收藏
            </NavLink>
          </li>
        </ul>
        <button type="button"
          className="btn p-0 d-none d-lg-block">
          <img src={languageLogo} alt="languageLogo" width={24} height={24}/>
          <span className="ms-3">中文</span>
        </button>
      </div>
      <div className="offcanvas offcanvas-end w-70"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel">
        <div className="offcanvas-header pt-12">
          <img src={mainLogo} alt="mainLogo" />
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="list-unstyled">
            <li className="border-bottom border-gray-600">
              <NavLink className="d-block p-4"
                to="/bus-route/Taipei">
                搜尋路線
              </NavLink>
            </li>
            <li className="border-bottom border-gray-600">
              <NavLink className="d-block p-4"
                to="/bus-favorites">
                我的收藏
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
