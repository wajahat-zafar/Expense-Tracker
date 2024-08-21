import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './Pages/root';
import Balance from "./Components/Balance";
import ExpenseTracker from './Components/expList';
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";  


const router = createBrowserRouter ([
  {
    path:"/",
    element: <Root />,
    children: [
      {
        path:"/",
        element: <Balance />,
      }
    ]
},
{
  path: "/tracker",
  element: <ExpenseTracker />
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
