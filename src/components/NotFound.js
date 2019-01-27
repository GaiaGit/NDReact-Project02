import React from 'react';
import NotFoundImage from '../assets/404.svg';

const NotFound = () => (
 <div className="notfound">
  <img src={NotFoundImage} alt="Page not found" />
  <p className="text-secondary font-weight-bold h3">Sorry, page not found : (</p>
 </div>
);

export default NotFound;
