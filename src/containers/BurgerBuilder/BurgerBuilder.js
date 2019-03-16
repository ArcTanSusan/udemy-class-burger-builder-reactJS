import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Navigation/SideDrawer/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Navigation/SideDrawer/UI/Spinner/Spinner';

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
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    console.log("[componentDidMount], this.props: ", this.props);
    axios.get('/ingredients.json')
    .then(resp => {
      this.setState({ingredients: resp.data});
    })
    .catch(error => this.setState({error: true}));
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
     .map(igKey => {
       return ingredients[igKey]
     })
     .reduce((sum, el)=> {
       return sum + el
     } , 0);
    this.setState({
      purchaseable: sum > 0
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {...this.state.ingredients};
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

      const queryParams = [];
      let ingredsAndTotalPrice = {... this.state.ingredients};
      ingredsAndTotalPrice['price'] = this.state.totalPrice;
      for (let i in ingredsAndTotalPrice) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredsAndTotalPrice[i]));
      }

      const queryStr = queryParams.join("&");
      // Go tto checkout page after clicking Continue button.
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryStr,
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant be loaded.</p> :<Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.closeModalHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default BurgerBuilder;
