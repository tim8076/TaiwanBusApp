import App from '../App';
import Home from '../pages/Home';
import BusRoute from '../pages/BusRoute';
import BusStops from '../pages/BusStops';
import { createHashRouter } from 'react-router-dom';
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/bus-route/:city',
        element: <BusRoute />
      },
      {
        path: '/bus-stops',
        element: <BusStops />
      }
    ],
  },
];

const router = createHashRouter(routes);
export default router;