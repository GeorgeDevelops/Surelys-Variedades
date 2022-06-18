import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {  useNavigate, useLocation } from 'react-router-dom';
import productService from '../../services/productService';

const Card = (props) => {
const [products, setProducts] = useState([]);
const [filtered, setFiltered] = useState([]);

const { section } = useParams();
const navigate = useNavigate();

const search = useLocation().search;
const category = new URLSearchParams(search).get("category");

const filterSectionMatch = (products, section, category) => { 
    if (section === undefined) return setFiltered(products);
    if (section === 'ropa') return setFiltered(products);

    let filtered = products.filter(p => p.category.includes(section));
    return setFiltered(filtered);
}

async function getProducts(){
    const { data } = await productService.getProducts();
    setProducts(data);
    filterSectionMatch(data, section);
}

function getImage(image){
    let { url } = JSON.parse(image);
    return url;
}

useEffect(()=>{
    getProducts();
}, [section]);

useEffect(()=>{
    filterSectionMatch(products, section, category);
}, [section]);

useEffect(()=>{
    if (category === "todos") return filterSectionMatch(products, section, category);

    if (category === section) return filterSectionMatch(products, section, category);

    if (!category) {
        return;
    } else {
        const categorized = filtered.filter(i => i.category.includes(category));
        return setFiltered(categorized);
    } 

}, [category]);

    return (
        <React.Fragment>
              { products.length < 1 ? <p className='noFound'>Ningun articulo ha sido publicado !!!</p> : filtered.map(c =>  <div id="card" key={c._id} onClick={() => navigate(`/product-details/${c._id}`)}>

                    <div className="img-container">
                        <img src={ getImage(c.images[0]) }  alt={c.title} width={225} height={200} className='card-image' />
                    </div>

                    { c.stock < 1 ? <span style={{ color: "#C0392B",
                     fontFamily: 'fantasy',
                     textAlign: "center",
                     letterSpacing: "1px"}}>Vendido</span> : null}

                    <p className='title'>{ c.name }</p>

                    <span className="size">{ c.sizes.toString() }</span>

                    <span className="price">RD${ c.price }</span>

                    <button className='button'>Agregar al carrito</button>
                </div> ) }
        </React.Fragment>
     );
}
 
export default Card;
