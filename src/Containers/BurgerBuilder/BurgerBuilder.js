import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import axios from '../../axios-orders';




class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    /*opens the modal*/
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    /*closes the modal*/
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    /*success button on order summary modal*/
    purchaseContinueHandler = () => {
            this.props.history.push('/checkout');
    }
    

    /*Order now button will be enabled only if ingredients are selected*/
    updatePurchaseState(updatedIngredients) {
        const sum = Object.values(updatedIngredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    }

    render() {
        /*disabledinfo will have true /false as value*/
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        

        let burger = this.props.error?<p>Ingredients cannot be loaded</p>:<Spinner/> 
        let orderSummary=null;
        if(this.props.ings){
            burger=(<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.props.totPrice}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ingredientAdded={this.props.addIngredient}
                    ingredientRemoved={this.props.removeIngredient}
                    disabled={disabledInfo}
                    click={this.purchaseHandler} />
            </Aux>)
            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            continue={this.purchaseContinueHandler}
            cancel={this.purchaseCancelHandler}
            price={this.props.totPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
};

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        addIngredient:(ingName)=>dispatch(burgerBuilderActionCreators.addIngredient(ingName)),
        removeIngredient:(ingName)=>dispatch(burgerBuilderActionCreators.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActionCreators.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));