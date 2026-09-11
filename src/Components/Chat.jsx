import { useParams } from "react-router-dom";

export default function () {
const{targetUserID}=useParams()
console.log(targetUserID)

  return <div>CHAT</div>;
}
