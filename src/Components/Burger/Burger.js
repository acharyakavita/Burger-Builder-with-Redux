import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter} from 'react-router-dom';

const burger = (props) => {
    /*The below code gets an object as input from the props having ingredients name and quantity.
    We use Object.keys to convert the recieved object into an array of elements with the repeatition of ingredients as per the quantity*/
    let arrayOfIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) =>
                <BurgerIngredients key={igKey + i} type={igKey} />
            )
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
        /*reduce method helps in concatinating all the child array items into one in arrayOfIngredients 
        which helps in calculating teh length of the whole array. We acn also use filter method here.*/
        /*filter(
        burgerIngredient => burgerIngredient.length > 0
        );*/
        if (arrayOfIngredients.length === 0){
            arrayOfIngredients=<p>Please start adding ingredients</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {arrayOfIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
};

export default withRouter(burger);