import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Navigation/SideDrawer/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
     .map(igKey => {
       return ingredients[igKey]
     })
     .reduce((sum, el)=> {
       return sum + el
     } , 0);
    console.log("sum:", sum);
    console.log(this.state);
    this.setState({
      purchaseable: sum > 0
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    let updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    }
    if (updatedCount < 0) {
      updatedCount = 0;
    }
    updatedIngredients[type] = updatedCount;
    const priceRemoved = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemoved;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
      this.setState({
        purchasing: true
      })
  };

  closeModalHandler = () => {
    this.setState({
      purchasing: false
    })
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.closeModalHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
