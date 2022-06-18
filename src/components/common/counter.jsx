import React from 'react';

const Counter = (props) => {
    const { onIncrement, onDecrement, amount } = props;

    return ( <React.Fragment>
              <button onClick={onDecrement} disabled={ amount === 1 ? true : null} className="btn-gray">-</button>
              <span className="bg-purple">{ amount }</span>
              <button onClick={onIncrement} className="btn-blue">+</button>
    </React.Fragment> );
}
 
export default Counter;