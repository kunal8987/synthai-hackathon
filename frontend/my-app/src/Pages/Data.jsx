import { useEffect, useState } from "react"
import "../Components/Data.css"

function Data(){
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)

    useEffect(()=>{
        getData()
    },[page])

    const getData=()=>{
        fetch(`https://real-rose-peacock-tutu.cyclic.app/save/get/${page}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`${localStorage.getItem("token")}`
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log("res",res)
            setData(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    console.log("data",data)
    return(
        <div className="data-main">
            <h1 className="heading-ans">Que & Ans</h1>
            <div className="data-container">
                <h1 className="data-container-h1">Question:</h1>
                <div className="data-container-question">
                    <p className="data-container-p">{data[0]?.post}</p>
                </div>
                <br />
                <h1 className="data-container-h1">Answer:</h1>
                <div className="data-container-answer">
                    <p className="data-container-p">{data[1]?.post}</p>
                </div>
            </div>
            <br />
            <div className="data-buttons">
                <button className="data-button-one" disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
                <button className="data-button-one">{page}</button>
                <button className="data-button-one" onClick={()=>setPage(page+1)}>Next</button>
            </div>
            <br />
            <br />
        </div>
    )
}
export default Data