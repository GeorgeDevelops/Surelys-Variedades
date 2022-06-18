import React from 'react';

const Input = (props) => {

    const { type, name, label, placeholder, id, classes, value, readOnly, labelStyle, handleChange } = props;

    return ( 
        <React.Fragment>
            <label className={labelStyle} htmlFor={name}>{label}</label>
            <input 
            type={type}
            placeholder={placeholder} 
            id={id}
            name={name}
            className={classes}
            onChange={handleChange}
            value={value}
            readOnly={readOnly}
            />
        </React.Fragment>
     );
}
 
export default Input;