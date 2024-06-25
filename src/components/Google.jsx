import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from '../utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';


const Google = () => {
    //Google inicia sesión con éxito

    const [user, setUser] = useState ({});

    const handleCallbackResponse = (response) => {

      console.log("Encoded JWT ID token: " + response.credential);
      var userObject = jwtDecode(response.credential);
      console.log(userObject);
      setUser(userObject);
      /* token de Google
      axios.post('/login/', { token: response.credential })
      .then(res => {
        console.log('Inicio de sesión exitoso', res.data);
        // Guardar el token en el localStorage
        localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
        console.error('Error en el inicio de sesión', err);
      });
      */

    };
  
    useEffect(() => {
      
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "832128322079-birr6rv8471inbd2crv7lfmek498933f.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
  
        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        );
      }
    }, []); // Este array vacío asegura que el efecto solo se ejecute una vez cuando el componente se monte
  
    return (
      <div id="signInDiv"></div> 
    );
  };
  

export default Google;
