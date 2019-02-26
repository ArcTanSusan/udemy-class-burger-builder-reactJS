import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const toolbar = (props) => {
  return (
    <Aux>
      <Backdrop show />
      <header className={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </header>
    </Aux>
  )

};

export default toolbar;
