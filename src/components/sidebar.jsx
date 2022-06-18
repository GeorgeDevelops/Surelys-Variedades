import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

const Sidebar = (props) => {
    const [searchParams, setSearchParams] = useSearchParams({});

    const filterContent = ({ currentTarget: input }) => {
        return setSearchParams({ category: `${input.value}`});
    }

    return ( 
        <React.Fragment>
           <aside id="sidebar">
                <div>
                <span>Categorias</span>
                    <select name="category" id="category" onChange={filterContent}>
                        <option value='todos'>Todos</option>
                        <option value='hombres'>Hombres</option>
                        <option value='mujeres'>Mujeres</option>
                        <option value='niños/as'>Niños/as</option>
                        <option value='poloches'>Poloches</option>
                        <option value='camisas'>Camisas</option>
                        <option value='interiores'>Ropa interior</option>
                        <option value='calzados'>Calzados</option>
                        <option value='pantalones'>Pantalones</option>
                        <option value='bermudas'>Bermudas</option>
                        <option value='accesorios'>Accesorios</option>
                    </select>
                </div>
           </aside>
        </React.Fragment>
     );
}
 
export default Sidebar;