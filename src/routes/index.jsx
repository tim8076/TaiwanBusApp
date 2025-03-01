import App from '../App';
import Home from '../pages/Home';
import BusRoute from '../pages/BusRoute';
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
        path: '/bus-route',
        element: <BusRoute />
      }
    ],
  },
];

const router = createHashRouter(routes);
export default router;