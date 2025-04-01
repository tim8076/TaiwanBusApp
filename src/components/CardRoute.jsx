import heartIcon from '../assets/images/icons/carbon_favorite.svg';
import heartIconFill from '../assets/images/icons/carbon_favorite-filled.svg';
import { getCityNameChinese } from '../tools/cityMap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alertConfirm } from '../tools/sweetAlert';

export default function CardRoute({ route, favoriteRoutes, handleFavoriteSave, className, isConfirm }) {
  const isFavorite = favoriteRoutes.find(item => item.RouteID === route.RouteID);
  const icon = isFavorite ? heartIconFill : heartIcon;

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (isConfirm) {
      const res = await alertConfirm(`確認移除路線 ${route.RouteName.Zh_tw}?`);
      if (res.isConfirmed) handleFavoriteSave(route);
    } else {
      handleFavoriteSave(route);
    }
  };

  return (
    <Link to={`/bus-stops?city=${route.City}&routeName=${route.RouteName.Zh_tw}`}
      className={`d-block px-3 ${className}`}>
      <div className="d-flex justify-content-between mb-1">
        <h2 className="fs-1">
          { route.RouteName?.Zh_tw }
        </h2>
        <button type="button"
          className="p-0 btn"
          onClick={(e) => toggleFavorite(e)}>
          <img src={icon} alt="heartIcon" width={20} height={20}/>
        </button>
      </div>
      <div className="d-flex justify-content-between text-gray-600 pb-3 border-bottom border-gray-500">
        <h3 className="fs-5">
          {route.DepartureStopNameZh} - {route.DestinationStopNameZh}
        </h3>
        <p className="fs-5">{getCityNameChinese(route.City)}</p>
      </div>
    </Link>
  )
}

CardRoute.propTypes = {
  route: PropTypes.object,
  favoriteRoutes: PropTypes.array,
  handleFavoriteSave: PropTypes.func,
  className: PropTypes.string,
  isConfirm: PropTypes.bool
}