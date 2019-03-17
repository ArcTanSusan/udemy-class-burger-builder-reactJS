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
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        zipcode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '11223'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
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
    let formData = {};
    for (let formType in this.state.orderForm) {
      formData[formType] = this.state.orderForm[formType].value;
    }
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

    checkValidity(value, rules) {
      let isValid = true;
      if (rules.required) {
        isValid  = value.trim() !== '' && isValid;
      }
      else if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
      else if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
      return isValid;
    };

    inputChangeHandler = (event, formType)  => {
      // Do deeply nested updating of a single value on change.
      console.log(event.target.value);
      const updatedOrderForm =  {...this.state.orderForm};
      const updatedFormEl = {...updatedOrderForm[formType]};
      updatedFormEl.value = event.target.value;
      updatedOrderForm[formType].valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
      updatedOrderForm[formType] = updatedFormEl;
      console.log("[inputChangeHandler] updatedFormEl: ", updatedFormEl);
      this.setState({orderForm: updatedOrderForm})
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
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              changed={(event) => this.inputChangeHandler(event, formElement.id)} />
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
