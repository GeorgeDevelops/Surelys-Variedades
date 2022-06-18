
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './common/input';
import productService from '../services/productService';
import { toast } from 'react-toastify';
import { ProgressBar } from 'react-bootstrap';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { v4 } from 'uuid';
import { jwtDecoded } from '../services/jwtDecode';

const CreateProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [sizes, setSizes] = useState("");
    const [categories, setCategories] = useState("");
    const [description, setDescription] = useState("");
    const [UploadPercentage, setUploadPercentage] = useState("");
    const [size, setSize] = useState(window.innerWidth);
    const [data, setData] = useState({});

    const toastId = React.useRef(null);

    const handleChange = ({ currentTarget: input }) => {
        if (input.name === "files"){
            let images = input.files;
            setFiles(images);
        }
        if (input.name === "title"){ 
            setName((input.value))
        }
        if (input.name === "price"){ 
            setPrice((input.value).trim())
        }
        if (input.name === "stock"){ 
            setStock((input.value).trim())
        }
        if (input.name === "category"){ 
            const c = (input.value).trim().toLowerCase().split(',');
            setCategories(c)
        }
        if (input.name === "sizes"){ 
            const s = (input.value).trim().split(',');
            setSizes(s);
        }
        if (input.name === "description"){ 
            setDescription((input.value))
        }
    }

    const handleFileInput = async ({ currentTarget: input }) => {
        var urls = [];
        for(let i = 0; i < input.files.length; i++){
            const imageRef = ref(storage, `images/${input.files[i].name + v4()}`);
            uploadBytes(imageRef, input.files[i]).then(async (snapshot)=>{ 
               const url = await getDownloadURL(snapshot.ref);
               urls.push(JSON.stringify({url: url}));
               setData({...data, images: urls});
            });
        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt){
            const { isAdmin } = jwtDecoded(jwt);
            if (!isAdmin){
                window.location = '/';
            }
        }
    }, []);

    useEffect(()=>{ }, [handleFileInput]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {
                name: name,
                price: Number(price),
                stock: Number(stock),
                sizes: sizes,
                categories: categories,
                desc: description,
                images: data.images
            }
            
            toastId.current = toast.info("Publicando articulo..., Por favor espere.", {autoClose: false});
            const res = await productService.postProduct(body);

            if (res.status === 200){
                setUploadPercentage(0)
                setFiles("")
                setName("")
                setPrice("")
                setStock("")
                setSizes("")
                setCategories("")
                setDescription("")
               return toast.update(toastId.current, {render: res.data, type: toast.TYPE.SUCCESS, autoClose: 3000});
            }
            
        } catch (ex) {
            return toast.update(toastId.current, {render: ex.response.data, type: toast.TYPE.ERROR, autoClose: 3000});
        }
    }

    function handleResize (){
        setSize(window.innerWidth);
      }
  
      const deviceWidth = window.innerWidth;
  
      useEffect(()=>{
        window.addEventListener('resize', handleResize);
      }, [deviceWidth]);

    return ( 
    <React.Fragment>
           <form id='newProductForm' onSubmit={handleSubmit}>
            <div id='publishHolder'>
                <h2>Publicar nuevo articulo</h2>

                <label id='fileLabel' htmlFor="myfile">
                <FontAwesomeIcon id='upload-icon' className='icon' icon="fas fa-upload" />
                &nbsp; { size > 830 && 'Click aqui para seleccionar imagenes'}
                </label>    
                <input 
                accept="image/png, image/jpeg" 
                type="file" 
                id="myfile" 
                onChange={handleFileInput}
                name="files" multiple />

                { UploadPercentage > 0 && <ProgressBar now={UploadPercentage} animated label={`${UploadPercentage}%`} /> }<br />

               <Input
                type="text"
                name="title"
                id="title"
                placeholder="Titulo del articulo"
                classes="productInfo"
                handleChange={handleChange}
                value={name}
                 />
    
                <Input
                type="number"
                name="price"
                id="price"
                placeholder="Precio del articulo"
                classes="productInfo"
                handleChange={handleChange}
                value={price}
                 />
    
                <Input
                type="number"
                name="stock"
                id="stock"
                placeholder="Stock del articulo"
                classes="productInfo"
                handleChange={handleChange}
                value={stock}
                 />

                <Input
                type="text"
                name="sizes"
                id="sizes"
                placeholder="Sizes disponibles, Ej: M, S, XL, 42, 43 ...etc"
                classes="productInfo"
                handleChange={handleChange}
                value={sizes}
                 />

                <Input
                type="text"
                name="category"
                id="category"
                placeholder="Categorias, Ej: mujer, hombres, calzados ..etc"
                classes="productInfo"
                handleChange={handleChange}
                value={categories}
                 />
            
                 <Input
                 type="text"
                 name="description"
                 id="description"
                 placeholder="Descripcion del articulo"
                 classes="productInfo"
                 handleChange={handleChange}
                value={description}
                 />

                <button type='submit'>Publicar Articulo</button>
           </div>
           </form>

    </React.Fragment> 
    );
}
 
export default CreateProduct;