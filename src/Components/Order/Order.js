import React from 'react';
import Classes from './Order.css';

const order = (props) => {
        let ingredients=[];
        for(let ingredient in props.ingredients)
        {
            ingredients.push({name:ingredient,
                amount:props.ingredients[ingredient]})
        }
        let ingredientOutput=ingredients.map(ig=>{
            return <span style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',border:'1px solid #ccc',padding:'5px'}}
            key={ig.name}> {ig.name}({ig.amount}) </span>
        })
    return (
        <div className={Classes.Order}>
            <p>Ingredients:{ingredientOutput}</p>
            <p>Price: USD {Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    )
}
export default order;