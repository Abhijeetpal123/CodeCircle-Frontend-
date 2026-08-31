import Body from "./Components/Body.jsx";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup.jsx";
import Feed from "./Components/Feed.jsx";
import Request from "./Components/Request.jsx";
import Connection from "./Components/Connection.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request"
              element={
                <ProtectedRoute>
                  <Request />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/connection"
              element={
                <ProtectedRoute>
                  <Connection />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
