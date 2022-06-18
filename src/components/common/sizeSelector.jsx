import React from 'react';

const SizeSelector = (props) => {
    const { sizes, size } = props;
    return ( 
    <React.Fragment>
        {
        sizes.map( s => <div className="sizeItem" key={s}>
            <input onClick={size} type="radio" id={s} name="size" value={s}></input>
            <label htmlFor={s}>{s}</label>
        </div>)
        }
    </React.Fragment> );
}
 
export default SizeSelector;