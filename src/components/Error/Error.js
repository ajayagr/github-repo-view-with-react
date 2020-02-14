import React from 'react';

import classes from  './Error.module.css';

const ErrorMessage = ({ error }) => (
  <div className={classes.ErrorMessage}>
    <small>{error.toString()}</small>
  </div>
);

export default ErrorMessage;
