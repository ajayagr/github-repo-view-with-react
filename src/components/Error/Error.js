import React from 'react';
import {Link} from 'react-router-dom';
import classes from  './Error.module.css';

const ErrorMessage = ({ error }) => (
  <div className={classes.ErrorMessage}>
    <p>{error.toString()}</p>
    <p>Click <Link to="/">here</Link> to go back to home page!!</p>
  </div>
);

export default ErrorMessage;
