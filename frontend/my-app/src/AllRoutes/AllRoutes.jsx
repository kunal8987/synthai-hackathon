import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home"
import HomePage from "../Pages/HomePage"

function AllRoutes(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </div>
    )
}
export default AllRoutes