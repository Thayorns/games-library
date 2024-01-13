import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './app/store/store';
import App from './app/index';
import ErrorPage from "./pages/error-page";
import ListItemDescription from './pages/list-item-description';
import ListItem from './pages/list-item';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list-item-description/:id",
    element: <ListItemDescription/>
  },
  {
    path: "/",
    element: <ListItem/>
  }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> 
  </React.StrictMode>
);
