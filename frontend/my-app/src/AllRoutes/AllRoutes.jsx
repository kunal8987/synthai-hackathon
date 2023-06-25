import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home"
import HomePage from "../Pages/HomePage"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Data from "../Pages/Data"

function AllRoutes(){
    return(
        <div>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/data" element={<Data/>}/>
            </Routes>
        </div>
    )
}
export default AllRoutes