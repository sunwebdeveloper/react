import React, { Component } from 'react'; 
import './cabecalho.css';


class Cabecalho extends Component{
    render(){
        return(
            <header className="cabecalho">
                <div className="cabecalho__container container">                
                    <h1 className="cabecalho__logo">
                        <a href="/">
                            Twitter React + Redux
                        </a>
                    </h1>
                </div>
                {this.props.children}
            </header>
        );
    }
}

export default Cabecalho;