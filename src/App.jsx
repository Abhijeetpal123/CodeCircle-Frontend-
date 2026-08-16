import Body from "./Body";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>} >
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
         </Route>
        </Routes>
      </BrowserRouter>
   
    </>
  );
}
