import React from 'react';

const currentUserContext = React.createContext();
currentUserContext.displayName = "MainContext";

export const cartContext = React.createContext();
cartContext.displayName = "CartContext"

export default currentUserContext;