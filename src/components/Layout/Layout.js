import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosed = () => {

  }
  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer />
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
