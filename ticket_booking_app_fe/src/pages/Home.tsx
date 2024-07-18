import { useNavigate } from "react-router-dom"
import Layout from "components/authentication/Layout";
import { toast } from 'react-toastify';


export default function Home() {
  const navigate = useNavigate();
  const onclick = () => {
    console.log("onlick")
    toast.success("Successfull signup, please login", { autoClose: 3000 });
    navigate("/login", { replace: true })
  }
  return (
    <Layout>
      <button onClick={onclick}>Login</button>
      <div>Home Page</div>
    </Layout>
  );
}
