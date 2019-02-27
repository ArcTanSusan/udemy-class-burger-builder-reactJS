import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../Navigation/SideDrawer/UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("OrderSummary will update");
  };
  
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransformed:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      )
    })

  return (
    <Aux>
     <h3>Your Order </h3>
     <p>Delicious burger with following ingredients:</p>
     <ul>
      {ingredientSummary}
     </ul>
     <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
     <p>Continue to checkout?</p>
     <Button buttonType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
     <Button buttonType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
    </Aux>
  );
  }
}

export default OrderSummary;

// Below is functional component
// const orderSummary = (props) => {
//   const ingredientSummary = Object.keys(props.ingredients)
//     .map(igKey => {
//       return (
//         <li key={igKey}>
//           <span style={{textTransformed:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
//         </li>
//       )
//     })
//
//   return (
//     <Aux>
//      <h3>Your Order </h3>
//      <p>Delicious burger with following ingredients:</p>
//      <ul>
//       {ingredientSummary}
//      </ul>
//      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
//      <p>Continue to checkout?</p>
//      <Button buttonType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
//      <Button buttonType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
//     </Aux>
//   );
// };
//
// export default orderSummary;
