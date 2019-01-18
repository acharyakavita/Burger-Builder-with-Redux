import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} toggle={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} click={this.sideDrawerClosedHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )

    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);