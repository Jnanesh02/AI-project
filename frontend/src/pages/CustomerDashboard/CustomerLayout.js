import { Outlet } from "react-router-dom";
import React from 'react'
import { CustomerNavbar } from "./CustomerNavbar";

export const CustomerLayout = () => {
  return (
    <div>
    <CustomerNavbar/>
    <Outlet/>
    </div>
  )
}
