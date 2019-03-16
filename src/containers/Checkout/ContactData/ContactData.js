import React, {Component} from 'react';
import Button from '../../../components/Navigation/SideDrawer/UI/Button/Button';
import classes from '../ContactData/ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Navigation/SideDrawer/UI/Spinner/Spinner';
import Input from '../../../components/Navigation/SideDrawer/UI/Input/Input';

class ContactData extends Component {
    state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: ''
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: ''
        },
        zipcode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '11223'
          },
          value: ''
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your country'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email'
          },
          value: ''
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'fastest'},
              {value: 'cheapest', displayValue: 'cheapest'}
            ]
          },
          value: ''
        }
      },
      loading: false,
  }

    orderHandler = (event) => {
      event.preventDefault();
      console.log("[orderHandler], this.props.ingredients: ", this.props.ingredients, "for total price of ", this.props.price);
      this.setState({
        loading: true
      })
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
      }
      axios.post('/orders.json', order).then(
        resp => {
          console.log("added a new order, resp: ", resp);
          this.setState({loading: false});
          this.props.history.push('/');
        }).catch(
          error => {
            this.setState({loading: false});
        });

    };
    render ()  {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
      let form = (
        <form>
          {formElementsArray.map(formElement => (
            <Input key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} />
          ))}
          <Button btntype="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      );
      if (this.state.loading) {
        form = <Spinner />
      }
      return (
        <div className={classes.ContactData}>
          <h4>Enter contact data</h4>
          {form}
        </div>
      )
    }
}

export default ContactData;
