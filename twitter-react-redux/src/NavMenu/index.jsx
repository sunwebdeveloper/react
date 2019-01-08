import React, { Component } from 'react'; 
import './navMenu.css';

class NavMenu extends Component{    
    render(){
        const usuario = this.props.usuario;
        return(            
            <header className="cabecalho">
                <nav className="navMenu">
                    <ul className="navMenu_Lista">
                        <li className="navMenu__item">
                            <a className="navMenu_link" href="#">
                                Bem vindo(a): <br />
                                <strong>{usuario}</strong>
                            </a>                     
                        </li>
                        <li className="navMenu__item">
                            <a className="navMenu__link" href="#">Home</a>
                        </li>
                        <li className="navMenu__item">
                            <a className="navMenu__link" href="#">Notificações</a>
                        </li>
                        <li className="navMenu__item">
                            <a className="navMenu__link" href="#">Mensagens</a>
                        </li>
                        <li className="navMenu__item">
                            <a className="navMenu__link" href="#">Sair</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default NavMenu;