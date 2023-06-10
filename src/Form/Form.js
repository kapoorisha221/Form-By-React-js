import React, { useEffect, useState } from 'react'
import "./Form.css"
import mono from "../assets/mono.png"

const Form = () => {
  const initialValues={username:"",email:"",password:""};
  const [formValues,setFormvalues]=useState(initialValues);
  const [formErrors,setFormErrors]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);

const handleChange =(e)=>{
  const {name,value}=e.target;
  setFormvalues({...formValues,[name]:value});

}
const handleSubmit =(e)=>{
  e.preventDefault();
  setFormErrors(validate(formValues));
  setIsSubmit(true);
}
useEffect(()=>{
  console.log(formErrors);
  if(Object.keys(formErrors).length===0 && isSubmit){
    console.log(formValues);
  }
},[formErrors])

const validate=(values) =>{
  const errors={};
  const reg=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if(!values.username){
    errors.username="Usename is required";
  }
  if(!values.email){
    errors.email="Email is required";
  } else if (!reg.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }
  if(!values.password){
    errors.password="Password is required";
  }else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  return errors;
}

  return (
    
    
    <section>
      <div className='register'>
        <div className='col-1'>
          <h2>Sign In</h2>
          <span>Register</span>
          <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div >Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
          <form onSubmit={handleSubmit} id='form' className='flex flex-col'>
            <label>Username</label>
            <input type='text' placeholder='username' name='username' value={formValues.username}
            onChange={handleChange}
            />
            <p>{formErrors.username}</p>

            <label>Email</label>
             <input type='email' placeholder='email' name='email' value={formValues.email} 
            onChange={handleChange}
            />
            <p>{formErrors.email}</p>

            <label>Password</label>

            <input type='password' placeholder=' password' name='password' value={formValues.password}
            onChange={handleChange}
            />
            <p>{formErrors.password}</p>


            <button className='btn'> Sign In</button>
          </form>
          </div>
        </div>
        <div className='col-2'>
          <img src={mono} alt=''/>
        </div>
      </div>
    </section>
    
  )
}

export default Form