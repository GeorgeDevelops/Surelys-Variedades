import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Counter from './common/counter';
import SizeSelector from "./common/sizeSelector";
import productService from "../services/productService";
import cartService from "../services/cartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "./slider";
import { toast } from "react-toastify";

const ProductDetails = (props) => {
    const { setCount, count, user } = props;

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productSize, setProductSize] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [productImages, setProductImages] = useState(null);
    const [productStock, setProductStock] = useState(0);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [admin, setAdmin] = useState(null);
    const toastId = React.useRef(null);
    const [images, setImages] = useState([]);

    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState('');
    const [total, setTotal] = useState('');

    function renderSize(){
      if (!productSize || productSize.length === 0) return null;
      return <span>Sizes disponibles:</span>;
    }

    function onIncrement(){ 
      if (amount === productStock) return;
      setAmount(amount + 1);
      incrementPrice()
    }

    function onDecrement(){ 
      setAmount(amount - 1);
      decrementPrice()
    }

    function selectSize({currentTarget: input}){
      return setSize(input.value);
    }

    function incrementPrice(){
      setProductPrice(defaultPrice * (amount + 1));
      setTotal(defaultPrice * (amount + 1));
    }

    function decrementPrice(){
      setProductPrice(productPrice - defaultPrice);
      setTotal(productPrice - defaultPrice);
    }

    async function handleDelete(id){
      const sure = window.confirm("Seguro/a que quieres eliminar este producto?");
      if (sure) {
       try {
        const res = await productService.deletePost(id);
        toastId.current = toast.info("Eliminando producto..., Por favor espere.", { autoClose: false});

        if (res.status === 200) {
          toast.update(toastId.current, { render: res.data, type: toast.TYPE.SUCCESS, autoClose: 3000 });
          return setTimeout(()=>{
            window.location = "/ropa"
          }, 3000);
        }
       } catch (ex) {
         toast.error(ex.status);
       }
      }
    }

    function getAdmin(){
      if(user.isAdmin) return setAdmin(true);
      return;
    }
    
    const addToCart = async (product) => {
      if(!user) return toast.error("Debes iniciar seccion para poder agregar al carrito.")

      const Product = {
        product: product,
        amount: amount,
        size: size,
        total: total
      }
      
      try {
        var x = Number(count) + 1;
        setCount(x);
        localStorage.setItem("cart", x);

        const response = await cartService.add(Product);
      if (response.status && response.status === 200) return toast.success(response.data); 

      } catch (ex) {
        let cart = localStorage.getItem("cart");
        let y = Number(cart) - 1;
        localStorage.setItem("cart", y);
        setCount(y);
        return toast.error(ex.response.data);
      }
    }

    useEffect(() => {
        try {
          async function getproduct(productId){
            const { data } = await productService.getProduct(productId);
            setProduct(data);
            setProductImages(data.images);
            setProductName(data.name);
            if (data.sizes) setProductSize(data.sizes);
            setProductPrice(data.price);
            setProductStock(data.stock);
            setDefaultPrice(data.price);
            setProductDesc(data.desc);
            setTotal(data.price);
         }
         getproduct(productId);
         
        } catch (ex) {
          return toast.error(ex.response.data);
        }
    }, []);

    useEffect(() => {
      if (user){
        getAdmin();
      } else {
        return null;
      }
    }, [user]);

    useEffect(() => {
      if (productImages){
        let imgs = [];
         
        productImages.forEach(url => {
          imgs.push(JSON.parse(url));
        });

        if (imgs.length === productImages.length){
          return setImages(imgs)
        }
      }
    }, [productImages]);

    return (
      <React.Fragment>
      <h1 id="productDetailTitle">Detalle del articulo</h1>
      <section id="productDetailContainer">
        <div className="imgContainer">
              { 
                images.length > 0 && <Slider 
                images={images}
                slideWidth={'100%'}
                slideHeight={'100%'}
                horizontal={20}
                vertical={310}
                showBullets={true}
                bulletsColor={"#b6488b"} 
                topRelative={-20}
                objectFit={'contain'}
                /> 
              }
        </div>

        <div className="productInfo">
          <p className="productName">{ productName }</p>

          <p className="productDescription">
            Description:
            <br/>
            <span>
              { productDesc }
            </span>
          </p>
          <br/>

          <div className="">
              <Counter 
              onIncrement={onIncrement} 
              onDecrement={onDecrement}
              amount={amount}
              />
          </div><br/>
            <div className="productSize">
                { renderSize() }

                <br/>{
                    !productSize ? null : <SizeSelector 
                    sizes={productSize}
                    size={selectSize}
                     />
                  }<br/>
            </div>

          <br/>
          <p className="productPrice">
            <span>RD$ { productPrice }</span>
          </p>

          <button className="productBtn" onClick={ ()=> addToCart(product) }>Agregar al carrito</button>
        </div>
        {
          admin && <FontAwesomeIcon onClick={() => handleDelete(productId)} id="fa-trash-alt" icon="fas fa-trash-alt" />
        }
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
