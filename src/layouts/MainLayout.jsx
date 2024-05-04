import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../components/Navbar";

import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
}
