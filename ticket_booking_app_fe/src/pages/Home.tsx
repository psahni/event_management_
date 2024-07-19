import { useNavigate, Link } from "react-router-dom"
import Layout from "components/authentication/Layout";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import axios from "axios"


export default function Home() {
  const navigate = useNavigate();
  async function testApi() {
    console.log("test api called")
    return await axios.get('http://app.localhost:3000/api/user/test', { withCredentials: true })
  }

  useEffect(() => {
    testApi().then((res) => {
      console.log("rest...", res)
    })
  }, [])
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
