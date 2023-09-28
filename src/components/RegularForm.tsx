import { useState, ChangeEvent, FormEvent } from 'react';
import { useForm } from "react-hook-form";

import "./RegularForm.css"
import React from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}



export function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}


function RegularForm() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    // e.preventDefault();
    alert(JSON.stringify(formData));
  };

  return (
    <form id='form' onSubmit={handleSubmit(onSubmit)}>
      <h1>Change Me To React Hook Form</h1>
      <div>
        <input
          type="text"
          id="username"
          placeholder='Enter UserName'
          {...register("username", { required: true, minLength: 2 })}
          value={formData.username}
          onChange={handleChange}
          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username?.type === 'required' && <p role="alert">First name is required</p>}
        {errors.username?.type === 'minLength' && <p role="alert">First name is minLength</p>}

      </div>

      <div>
        <input
          type="text"
          id="email"
          placeholder='Enter Email'
          {...register("email", { required: true, minLength: 4, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === 'required' && <p role="alert">email is required</p>}
        {errors.email?.type === 'minLength' && <p role="alert">email is pattern</p>}
      </div>

      <div>
        <input
          type="text"
          id="password"
          placeholder='Enter Password'
          {...register("password", { required: true, minLength: 8, maxLength: 20, pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])/ })}
          value={formData.password}
          onChange={handleChange}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password?.type === 'required' && <p role="alert">password is required</p>}
        {errors.password?.type === 'minLength' && <p role="alert">password is minLength</p>}
        {errors.password?.type === 'maxLength' && <p role="alert">password is maxLength</p>}
        {errors.password?.type === 'pattern' && <p role="alert">password is pattern</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularForm;
