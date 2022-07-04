import React, {useEffect, useState} from 'react';
import { jwtDecoded } from '../services/jwtDecode';
import Preview from './common/preview';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import { v4 } from 'uuid';
import sliderService, { deleteSliderImage } from '../services/sliderService';
import { toast } from 'react-toastify';

const Portal = () => {
    const [imageToUpload, setImageToUpload] = useState(null);
    const [uploaded, setUploaded] = useState(null);
    const [uploading, setUploading] = useState(null);
    const [sliderContent, setSliderContent] = useState([]);

    const toastId = React.useRef(null);

    async function uploadImage(){
        if (!imageToUpload) return;

        try {
            setUploading(true);
            setUploaded(true);
            const imageRef = ref(storage, `slider/${imageToUpload.name + v4()}`);
    
            uploadBytes(imageRef, imageToUpload).then(async (snapshot)=>{ 
                const url = await getDownloadURL(snapshot.ref);
                setUploaded(null);
                setUploading(null);
    
                await sliderService.postSliderImage({ url: url}, null);
                toastId.current = toast.success("Nueva foto de portada publicada con exito.", {autoClose: 3000});
                getSliderContent();
            });
        } catch (ex) {
            return toast.update(toastId.current, {render: ex.response.data, type: toast.TYPE.ERROR, autoClose: 3000});
        }
    }

    async function getSliderContent(){

        try {
            const { data } = await sliderService.getSliderContent();
            return setSliderContent(data);

        } catch (ex) {
            return toast.error("ERROR: " + ex.response.data)
        }
    }

    async function deleteImage(e){
        const id = e;
        const response = await deleteSliderImage(id);
        getSliderContent();
    }

    useEffect(()=>{
        getSliderContent();
    }, []);

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt){
            const { isAdmin } = jwtDecoded(jwt);
            if (!isAdmin){
                window.location = '/';
            }
        }
    }, []);

    return (<React.Fragment>
        <div id='portalContainer'>
            <p>
                <span>Publicar nueva foto de portada</span>
            </p>

            <div id='fileInput'>
                {
                    uploading && <h2 style={{ 
                        color: '#333', 
                        fontFamily: 'cursive',
                        fontWeight: 'bold'
                    }}>Subiendo imagen...</h2>
                }
                {
                    !uploaded && <label 
                    htmlFor="portalPhoto" 
                  >Seleccionar imagen</label>
                }

                <input 
                type="file" 
                name="portalPhoto" 
                id="portalPhoto"
                accept="image/png, image/jpeg" 
                onChange={ (event) => {
                    setImageToUpload(event.target.files[0]);
                } } />
            </div>

                <div id='fileInput'>
                <label onClick={ uploadImage }>Subir imagen</label>
                </div>

            <ul id='photosViewer'>
                {
                    sliderContent.length < 1 ? <h2>Aun no hay imagenes publicadas</h2> : sliderContent.map(content => 
                        <li key={ content._id }>
                        <Preview alt={ content._id } imgId={content._id} handleClick={ deleteImage } img={content.image} key={ content._id } />
                        </li> )
                }
            </ul>
        </div>
    </React.Fragment>);
}
 
export default Portal;