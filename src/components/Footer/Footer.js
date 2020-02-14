import React from 'react';

import classes from './Footer.module.css';

const Footer = () => (
  <div className={classes.Footer}>
    <div>
      <small>
        <span className={classes.FooterText}>Built by  
          <span className={classes.Name}> Ajay Agarwal</span>
        </span>
      </small>
    </div>
  </div>
);

export default Footer;