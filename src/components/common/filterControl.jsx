// this component is for the filter controls of the sections
import React from "react";
import { useParams } from "react-router-dom";

const FilterControls = (props) => {
const { section } = useParams();

const nameSection = (section) => {
    if (section === 'niño-y-niñas') return "Niños & Niñas".toUpperCase();
    if (section === 'zapatillas-y-zapatos') return "Zapatillas & Zapatos".toUpperCase();
    if (section === 'perfumes-y-productos') return "Perfumes & Productos".toUpperCase();

    return section.toUpperCase(); 
}

  return (
    <React.Fragment>
        <nav id="filter-control-banner">
            <div>
                <span>{ nameSection(section) }</span>
            </div>
        </nav>
    </React.Fragment>
  );
};

export default FilterControls;
