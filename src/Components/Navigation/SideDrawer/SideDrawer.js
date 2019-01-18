import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';


const sideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer,classes.Close].join(' ');
        if(props.open){
            attachedClasses=[classes.SideDrawer,classes.open].join(' ');
        }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.click}/>
            <div className={attachedClasses} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>

    )
}
export default sideDrawer;