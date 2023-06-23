import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./AllRoutes/AllRoutes";

function App() {
  return (
    <div className="font-inter font-sans text-base leading-6 font-normal bg-[#1A374D] text-white bg-opacity-100 antialiased">
      {/* <h1 className="text-5xl text-red-500">Open Ai Project</h1> */}
      <AllRoutes/>
    </div>
  );
}

export default App;
