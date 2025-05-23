import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
export default function CardArea({ place }) {
  return (
    <NavLink className={`bg-light d-block py-5 py-lg-8 rounded-3 shadow-lg text-center ${place.color} bg-gray-500-hover transition-base`}
      to={place.path}>
      <svg width="35" height="35" viewBox="0 0 35 35" fill="currentColor"
        className='mb-1'
xmlns="http://www.w3.org/2000/svg">
        <path d="M29.5312 12.0312H31.7188V16.4062H29.5312V12.0312Z"/>
        <path d="M3.28125 12.0312H5.46875V16.4062H3.28125V12.0312Z"/>
        <path d="M21.875 21.875H24.0625V24.0625H21.875V21.875Z"/>
        <path d="M10.9375 21.875H13.125V24.0625H10.9375V21.875Z"/>
        <path d="M22.9688 4.375H12.0312C10.5814 4.37674 9.19139 4.95346 8.16618 5.97868C7.14096 7.00389 6.56424 8.39388 6.5625 9.84375V25.1562C6.56308 25.7362 6.79373 26.2923 7.20384 26.7024C7.61395 27.1125 8.17002 27.3432 8.75 27.3438V30.625H10.9375V27.3438H24.0625V30.625H26.25V27.3438C26.8299 27.3429 27.3858 27.1121 27.7958 26.7021C28.2059 26.292 28.4366 25.7361 28.4375 25.1562V9.84375C28.4358 8.39388 27.859 7.00389 26.8338 5.97868C25.8086 4.95346 24.4186 4.37674 22.9688 4.375ZM26.25 10.9375V17.5H8.75V10.9375H26.25ZM12.0312 6.5625H22.9688C23.6452 6.56451 24.3044 6.77586 24.8558 7.16754C25.4073 7.55921 25.824 8.112 26.0487 8.75H8.95125C9.17597 8.112 9.59267 7.55921 10.1442 7.16754C10.6956 6.77586 11.3548 6.56451 12.0312 6.5625ZM8.75 25.1562V19.6875H26.2511L26.2522 25.1562H8.75Z"/>
      </svg>
      <h2 className='mb-1'>{place.title}</h2>
      <h3 className='fs-6'>{place.subtitle}</h3>
    </NavLink>
  )
}

CardArea.propTypes = {
  place: PropTypes.object,
}
