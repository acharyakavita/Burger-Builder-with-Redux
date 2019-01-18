import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Classes from './auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email ID'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },isSignUp:true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    switchAuthModeHandler=(event)=>{
        this.setState(prevState=>{
            return {
                isSignUp:!prevState.isSignUp
            }
        })
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls =
        {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true

            }
        }
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }

    render() {
        
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(element => {
            return (<Input key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)} />)
        })
        if(this.props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error}</p>
            )
        }
        return (
            <div className={Classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                SWITCH To {this.state.isSignUp?'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    } 
}


const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password)=>dispatch(actions.auth(email,password))
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);