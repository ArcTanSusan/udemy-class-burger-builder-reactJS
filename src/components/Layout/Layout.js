import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }
  sideDrawerToggleHandler = () => {
    // This is clean way of setting a new state that depends on older state.
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
