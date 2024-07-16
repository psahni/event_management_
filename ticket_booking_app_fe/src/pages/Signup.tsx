import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import Layout from "components/authentication/Layout";


function SignUp() {
  const navigate = useNavigate();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {

  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.firstName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Register
            </button>
            <Link to={`/account/login`} className="btn btn-link">Cancel</Link>
          </form>
        </div>
      </div>
    </Layout>)
}

export default SignUp;