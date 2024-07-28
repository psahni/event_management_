import Layout from "components/authentication/Layout";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import authService from "services/auth.service";
import { HttpStatusCode } from "axios";
import { useAuth } from '../provider/authProvider';
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const { updateLoginFlag } = useAuth()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required'),
    password: Yup.string()
      .required('Password is empty')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;


  async function onSubmit(data: {email: string, password: string}) {
    const res = await authService.Login(data)
    if (res.status == HttpStatusCode.Ok) {
      toast.success("Logged successfully", { autoClose: 3000 });
      updateLoginFlag(true)
      navigate('/events', { replace: true })
    } else {
      toast.error("Login failed, please try again", { autoClose: 3000 })
    }
  }

  return(
    <>
      <Link to='/' >Home</Link>      
      <Layout>
        <div className="card">
          <h4 className="card-header">Login Page</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>
              <button className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login