import React, { useState } from "react";
import Input from "./common/input";
import httpService from './../services/httpService';
import { toast } from 'react-toastify';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");
  var toastId = React.useRef(null);

  async function handleChange({currentTarget: input}){
    if(input.name === "username"){
      setUsername(input.value)
    }
    if(input.name === "email"){
      setEmail(input.value)
    }
    if(input.name === "password"){
      setPassword(input.value)
    }
    if(input.name === "phone"){
      setPhone(input.value)
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    if (username === '') return setErrors("Nombre de usuario es obligatorio");
    if (email === '') return setErrors("Correo es obligatorio");
    if (password === '') return setErrors("Contraseña es obligatoria");
    if (password.length < 8) return setErrors("Contraseña debe ser al menos 8 caracteres, {ABC, 123, !@#}");
    if (password.length > 25) return setErrors("Contraseña debe ser menos de 25 caracteres");
    if (phone === '') return setErrors("Telefono es obligatorio");
    if (phone.length < 10) return setErrors("Telefono debe ser al menos 10 caracteres");
    if (phone.length > 13) return setErrors("Telefono debe ser menos de 14 caracteres");

    const reqbody = {
      username: username,
      email: email,
      password: password,
      phone: phone
    }

    toastId.current = toast.info("Registrando... Por favor espere.", { autoClose: false });
    const response = await httpService.post(`${process.env.REACT_APP_URL}/signup`, reqbody);

    if (response.status === 200) {
      toast.update(toastId.current, {render: response.data, type: toast.TYPE.SUCCESS, autoClose: 6000});
      localStorage.setItem('token', response.headers['x-auth-token']);
    } else {
      toast.update(toastId.current, {render: response.data, type: toast.TYPE.ERROR, autoClose: 6000});
    }

    setTimeout(()=>{
      window.location = '/home';
    }, 3000);
  }

  function displayError(){
    if (errors) return "block";
    return "none";
  }

  return (
    <React.Fragment>
      <div id="form-container">
          <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <Input 
          type="text" 
          name="username" 
          placeholder="Nombre de usuario" 
          classes="signup-input"
          handleChange={handleChange}
          value={username}
          />

          <Input 
          type="email" 
          name="email" 
          placeholder="Correo electronico" 
          classes="signup-input"
          handleChange={handleChange}
          value={email}
          />

          <Input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          classes="signup-input"
          handleChange={handleChange}
          value={password}
          />

          <Input 
          type="number" 
          name="phone" 
          placeholder="Telefono" 
          classes="signup-input"
          handleChange={handleChange}
          value={phone}
          />

          <span className="error" style={{ display: displayError() }}>{ errors }</span>

          <button type="submit" id="register-btn">
              Registrarse
          </button>

        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
