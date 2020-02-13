import React from 'react';

import './Input.module.css';

const Input = ({ children, color = 'black', ...props }) => {
  return(
  <input className={`Input Input_${color}`} {...props}>
    {children}
  </input>
  )
};

export default Input;
