import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
