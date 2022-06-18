import React, { useState, useEffect} from "react";
import Input from "./common/input";

const Footer = () => {
const [size, setSize] = useState('');

  function handleResize (){
    setSize(window.innerWidth);
  }

  const deviceWidth = window.innerWidth;

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
  }, [deviceWidth]);


  return (
    <React.Fragment>
      <footer className="py-5" id="footer">
        <div id="row" className="row">
          <div className="col-2">
            <h5>Categorias</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/mujeres" className="nav-link p-0 text-muted">
                  Mujeres
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/hombres" className="nav-link p-0 text-muted">
                  Hombres
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/niños" className="nav-link p-0 text-muted">
                  Niños & Niñas
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/accesorios" className="nav-link p-0 text-muted">
                  Accesorios
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/otros" className="nav-link p-0 text-muted">
                  Otros
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="col-2">
            <h5>Redes Sociales</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <a target="_blank" rel="noreferrer" href="https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2F8j1d4t&e=ATMeo1Q0cFF7EupbF5dHYNiIwGxeXJqXrB-EAyF8XD5ziS6alxTFGCieZBwyWe7XiOVvuaCYl_AEGh5qSbGtUA&s=1" className="nav-link p-0 text-muted">
                  WhatsApp
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="https://www.instagram.com/surelys_variedades/" target="_blank" rel="noreferrer" className="nav-link p-0 text-muted">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="col-2">
            <h5>Ayuda & Soporte</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Sobre nosotros
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Contactanos
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Preguntas & Respuestas
                </a>
              </li>
            </ul>
          </div>

          {
            size > 800 && <div className="col-4 offset-1">
            <form>
              <h5>Suscríbete a nuestro boletín</h5>
              <p>Resumen mensual de lo que es nuevo y emocionante de nosotros.</p>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                    Correo electrónico
                </label>
                <Input
                  id="newsletter1"
                  type="text"
                  classes="form-control"
                  placeholder="Servicio de suscripcion no disponible por el momento"
                />
                <button id="subscribe-btn" className="btn" type="button">
                    Suscríbete
                </button>
              </div>
            </form>
          </div>
          }

        </div>

        <div className="d-flex justify-content-between py-4 my-4 border-top">
          <p>2022 Company, Inc. All rights reserved &copy; Surelys Variedades.<br/>
            Located in the Dominican Republic.
          </p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use href="#twitter" />
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use href="#instagram" />
                </svg>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="#">
                <svg className="bi" width="24" height="24">
                  <use href="#facebook" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
