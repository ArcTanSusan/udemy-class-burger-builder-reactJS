import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios  from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    let fetchedOrdersList = []
    axios.get('/orders.json')
    .then(resp => {
      console.log("[Orders.js]. orders.json:", resp.data);
      for (let key in resp.data) {
        fetchedOrdersList.push({...resp.data[key], id: key});
      }
      this.setState({loading:false, orders: fetchedOrdersList});
    })
    .catch(err => {
      this.setState({loading: false});
    })
  }

  render() {
    return (
      <div>
      {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ))}
      </div>
    );
  }
}

export default Orders;
