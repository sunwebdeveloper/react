import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render(){
        const estaLogado = localStorage.getItem('TOKEN');
        const { component, ...props} = this.props;

        if(estaLogado){
            return <Route component={component} {...props} />
        } else {
            return <Redirect to="/login" />
        }
    }
}

export default PrivateRoute