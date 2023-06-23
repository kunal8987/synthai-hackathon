import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home"
import HomePage from "../Pages/HomePage"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

function AllRoutes(){
    return(
        <div>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    )
}
export default AllRoutes