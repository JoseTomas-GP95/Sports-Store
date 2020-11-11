import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./PasswordReset.css";
import * as C from '../redux/constants'

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [enviado, setEnviado] = useState(true);

    if (redirect) return <Redirect to="/login" />;

    var data = {
      email: email
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await fetch(C.SERVER_ADDRESS+"/passwordReset", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data), 
            });
        } catch (e) {
        throw e;
        }
        setEmail('');
        setEnviado(false);
        setTimeout(function () {
            setRedirect(true);
        }, 3000);
    };

  return (
    <div className="passwordReset">
    { enviado ? 
      <div className="sesion">
        <h1>Contraseña olvidada</h1> 
      <form
        onSubmit={(e) => {
          submit(e);
        }}>
          <input
            className="input"
            type="email"
            placeholder="nombre@ejemplo.com"
            onChange={(e) => setEmail(e.target.value )}
            required
          />
        <div className="botonEnviar">
          <input className="btn btn-primary" type="submit" value="Enviar" />
        </div>
      </form>
      <div className="textoPlano">
        <hr/>
        <p>Para reajustar su contraseña, envíe su dirección de correo electrónico. Si podemos encontrarlo en la base de datos,
          le enviaremos un email con instrucciones para poder acceder de nuevo.
        </p>
      </div>
    </div>
      :
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Commons-emblem-success.svg/1024px-Commons-emblem-success.svg.png" alt="Correo enviado" width="30%"/>
        <h3>Hemos enviado las instrucciones para reestablecer contraseña a tu email</h3>
      </div>
    }
    </div>
)};

export default PasswordReset;