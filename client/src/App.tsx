import { BrowserRouter, Routes, Route } from "react-router-dom"
import Search from "./pages/SearchPage"
import Details from "./pages/DetailsPage"
import Home from "./pages/HomePage"
import History from "./pages/HistoryPage"

export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/" element={<Search/>}/>
        <Route path="/" element={<Details/>}/>
        <Route path="/" element={<History/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}