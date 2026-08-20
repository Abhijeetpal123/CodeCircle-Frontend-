import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Body (){
    return(
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}