import { Link } from "react-router-dom";
export default function Navbar() {
  return(
    <nav className="flex justify-between font-bold">
      <h1>CodeCircle</h1>
      <div className= "flex gap-4">
     <Link to="/login">Login</Link>
     <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}
