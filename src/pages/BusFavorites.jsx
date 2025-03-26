import { NavLink, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import CardRoute from "../components/CardRoute";
export default function BusFavorites() {
  const [favoriteRoutes, setFavorites] = useLocalStorage('favoriteBusRoutes', []);
  
  const handleFavoriteSave = (route) => {
    const filteredData = favoriteRoutes.filter(item => item.RouteID !== route.RouteID);
    setFavorites(filteredData);
  };
  
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
                收藏路線
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="h-min-body container py-3 py-md-6">
        { favoriteRoutes.length > 0 ? (
          <>
            <h1 className="text-center mb-3 fs-1 text-primary mb-md-10">我的收藏路線</h1>
            <ul className="row list-unstyled gy-3 gy-md-6">
              { favoriteRoutes.map(route => {
                return (
                  <div className="col-md-6 col-lg-3"
                    key={route.id}>
                    <CardRoute route={route}
                      favoriteRoutes={favoriteRoutes}
                      handleFavoriteSave={handleFavoriteSave}
                      className="bg-gray-300-hover py-3 transition-base"
                    />
                  </div>)
              })}
            </ul>
          </>
        ) : (
          <div className="h-min-body d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-3 fs-1 text-primary mb-md-10">
              目前無收藏路線
            </h2>
            <div className="text-center">
              <Link to="/"
                className="btn btn-primary">
                搜尋公車路線
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
