import React, { useState } from 'react';
import Input from "./common/input";
import { toast } from 'react-toastify';
import loginService from '../services/loginService';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const toastId = React.useRef(null);

  function handleChange({ currentTarget: input}){
    if (input.name === "email"){
      setEmail(input.value);
    }

    if (input.name === "password"){
      setPassword(input.value);
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    if (email === '') return setErrors("Correo es obligatorio");
    if (password === '') return setErrors("Contraseña es obligatoria");
    if (password.length < 8) return setErrors("Contraseña debe ser al menos 8 caracteres, {ABC, 123, !@#}");
    if (password.length > 25) return setErrors("Contraseña debe ser menos de 25 caracteres");

    const data = {
      email: email,
      password: password
    }
      
    try {
      toastId.current = toast.info("Iniciando seccion... Por favor espere.", { autoClose: false});
      const response = await loginService.login(data)
      
      if (response.status === 200){
        localStorage.setItem('token', response.headers['x-auth-token']);
        localStorage.setItem('isLogin', true);
        window.location = '/home';
      } 
      
    } catch (ex) {
      toast.update(toastId.current, { render: ex.response.data, type: toast.TYPE.ERROR, autoClose: 6000 });
    }
   
  }

  function displayError(){
    if (errors) return "block";
    return "none";
  }

    return ( 
        <React.Fragment>
              <div id="form-container">
          <h2>Iniciar seccion</h2>
        <form onSubmit={handleSubmit}>
          <Input 
          type="email" 
          name="email" 
          placeholder="Correo electronico" 
          classes="login-input"
          handleChange={handleChange}
          value={email}
          />

          <Input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          classes="login-input"
          handleChange={handleChange}
          value={password}
          />

          <span className="error" style={{ display: displayError() }}>{ errors }</span>

          <button type='submit' id="login-btn">
              Iniciar seccion
          </button>

        </form>
      </div>
        </React.Fragment>
     );
}
 
export default Login;