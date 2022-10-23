import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import productService from "../../services/productService";

const Card = (props) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const { section } = useParams();
  const navigate = useNavigate();

  const search = useLocation().search;
  const category = new URLSearchParams(search).get("category");

  const filterSectionMatch = (products, section, category) => {
    if (section === undefined) return setFiltered(products);
    if (section === "ropa") return setFiltered(products);

    let filtered = products.filter((p) => p.category.includes(section));
    return setFiltered(filtered);
  };

  async function getProducts() {
    const { data } = await productService.getProducts();
    setProducts(data);
    filterSectionMatch(data, section);
  }

  function getImage(img) {
    let { image } = JSON.parse(img);
    return image;
  }

  useEffect(() => {
    getProducts();
  }, [section]);

  useEffect(() => {
    filterSectionMatch(products, section, category);
  }, [section]);

  useEffect(() => {
    if (category === "todos")
      return filterSectionMatch(products, section, category);

    if (category === section)
      return filterSectionMatch(products, section, category);

    if (!category) {
      return;
    } else {
      const categorized = filtered.filter((i) => i.category.includes(category));
      return setFiltered(categorized);
    }
  }, [category]);

  return (
    <React.Fragment>
      {products.length < 1 ? (
        <p className="noFound">Ningun articulo ha sido publicado !!!</p>
      ) : (
        filtered.map((c) => (
          <div
            id="card"
            key={c._id}
            onClick={() => navigate(`/product-details/${c._id}`)}
          >
            <span id="out_stock">Vendido</span>
            <div className="img-container">
              <img
                src={getImage(c.images[0])}
                alt={c.title}
                width={225}
                height={200}
                className="card-image"
              />
            </div>

            <p className="title">{c.name}</p>

            <span className="size">{c.sizes.join(", ")}</span>

            <span className="price">RD${c.price}</span>

            <button className="button">Agregar al carrito</button>
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default Card;
