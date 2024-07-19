import { useNavigate, Link } from "react-router-dom"
import Layout from "components/authentication/Layout";
import { toast } from 'react-toastify';


export default function Home() {
  const navigate = useNavigate();
  const onclick = () => {
    toast.success("Successfull signup, please login", { autoClose: 3000 });
    navigate("/login", { replace: true })
  }
  return (
    <Layout>
      <Link to=''onClick={onclick}>Login | </Link>
      <Link to='/signup'>Signup</Link>
      <div>Home Page</div>
    </Layout>
  );
}
