import React from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
/* eslint-disable */
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main> 
    </div>
  );
}

export default Layout;
