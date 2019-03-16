import React, {Component} from 'react';
import Modal from '../../components/Navigation/SideDrawer/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInt = axios.interceptors.request.use(req =>{
        this.setState({
          error: null
        })
      })

      this.resInt = axios.interceptors.response.use(res => res, error =>{
        this.setState({
          error: error
        })
      })
    }

    componentWillUnMount() {
      // runs on cleanup
      console.log("Will unmount", this.reqInt, this.resInt);
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.request.eject(this.resInt);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      })
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler} >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
