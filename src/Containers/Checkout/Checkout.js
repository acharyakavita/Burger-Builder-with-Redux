import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

   
    clickCancelHandler=()=>{
        this.props.history.goBack();
    }

    clickContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary=<Redirect to= '/'/>
        let purchasedRedirect=null;
        if (this.props.ings){
            purchasedRedirect=this.props.purchased?<Redirect to= '/'/>:null
            summary=(<CheckoutSummary ingredients={this.props.ings} 
            clickCancel={this.clickCancelHandler} 
            clickContinue={this.clickContinueHandler}/>
            )
        }
        return(
            <div>
                {purchasedRedirect}
                {summary}  
                <Route path={this.props.match.path+'/contact-data'} 
                component={ContactData}   />
            </div>
            
        )
    }

}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);