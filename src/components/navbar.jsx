import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "./common/input";
import Cart from "./cart.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import productService from "../services/productService";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecoded } from "../services/jwtDecode";

const NavBar = (props) => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(window.innerWidth);
  const [show, setShow] = useState("none");
  const [user, setUser] = useState();
  const [searchPreview, setSearchPreview] = useState([]);

  function toggle() {
    if (show === "block") return setShow("none");
    setShow("block");
  }

  const handleChange = async ({ currentTarget: input }) => {
    setSearch(input.value);

    let searchResult = [];
    const { data: products } = await productService.getProducts();

    products.forEach((p) => {
      let name = p.name.toLowerCase();
      const match = name.match(input.value.toLowerCase());
      if (match) {
        searchResult.push(p);
      }
    });
    return setSearchPreview(searchResult);
  };

  function logout() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Esta seccion ya ha sido cerrada.");
      return (window.location = "/");
    }

    toastId.current = toast.info("Cerrando seccion... Por favor espere.", {
      autoClose: false,
    });

    localStorage.removeItem("token");
    toast.update(toastId.current, {
      render: "Seccion cerrada con exito.",
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
    });

    return setTimeout(() => {
      window.location = "/";
    }, 2000);
  }

  function handleResize() {
    setSize(window.innerWidth);
  }

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [deviceWidth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const u = jwtDecoded(token);
      setUser(u);
    }
  }, []);

  useEffect(() => {
    setShow("none");
  }, [location]);

  return (
    <React.Fragment>
      <div id="navbar">
        <p id="shop-title" className="text-center mt-3">
          Surelys Variedades Shop
          <span id="cart">
            <Cart user={user} size={size} />
          </span>
        </p>

        <nav
          className="navbar navbar-light navbar-expand-lg d-flex justify-content-between"
          style={{ backgroundColor: "#BF5F9A" }}
        >
          {size <= 1770 && (
            <FontAwesomeIcon
              id="menu"
              style={{ cursor: "pointer" }}
              onClick={toggle}
              icon="fa-solid fa-bars"
            />
          )}

          <ul
            className="navbar-nav"
            style={{
              display: size < 1771 ? show : "block",
              transition: "300ms",
              animation: show === "show" ? "300ms slideNav" : null,
              margin: "0px auto",
            }}
          >
            <li className="nav-item">
              <Link className="nav-link text-white links" to="/home">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/hombres">
                Hombres &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/mujeres">
                Mujeres &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/niños">
                Niños & Niñas &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/ropa">
                Ropa &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/calzados">
                Calzados &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/accesorios">
                Accesorios & Productos &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/hogar">
                Hogar &nbsp;
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white links" to="/otros">
                Otros
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link className="nav-link text-white links" to="/login">
                  Iniciar seccion
                </Link>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <Link className="nav-link text-white links" to="/signup">
                  Registrarse
                </Link>
              </li>
            )}
            {/* // here */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-white links" to="/perfil">
                  <FontAwesomeIcon className="icon" icon="fas fa-user" />
                  &nbsp;&nbsp;{user.username.split(" ")[0]}
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link text-white links"
                  to="/#"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    className="icon"
                    icon="fas fa-sign-out-alt"
                  />
                  &nbsp;&nbsp;Cerrar seccion
                </Link>
              </li>
            )}
          </ul>

          <li className="nav-item">
            <form className="d-flex">
              <Input
                className="form-control me-2 search"
                type="text"
                placeholder="Buscar"
                aria-label="Search"
                id="search"
                handleChange={handleChange}
                value={search}
              />
            </form>
            {searchPreview.length > 0 && search !== "" && (
              <ul id="searchPreview">
                {searchPreview.map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      navigate(`/product-details/${p._id}`);
                      setSearch("");
                    }}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
