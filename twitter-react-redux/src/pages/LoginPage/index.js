import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
    state = {
        mensagemErro: ''
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const login = this.loginInput.value;
        const senha = this.senhaInput.value;

        if(login.trim().length === 0){console.error('Login inválido.');return;}
        if(senha.trim().length < 6){console.error('Login inválido.');return;}

        const resposta = await fetch('http://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify({
                login,
                senha
            })
        });
        
        if(!resposta.ok){
            this.setState({mensagemErro:'Algo de errado nao esta certo.'});
            return;
        }
        
        const respostaJSON = await resposta.json();

        localStorage.setItem('TOKEN', respostaJSON.token);
        localStorage.setItem('LOGIN', login);
        this.props.history.push('/');        
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form 
                                className="loginPage__form"
                                onSubmit={this.handleSubmit}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input 
                                        className="loginPage__input" 
                                        type="text" 
                                        id="login" 
                                        name="login"
                                        ref={elem => this.loginInput = elem}
                                        />
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input 
                                        className="loginPage__input" 
                                        type="password" 
                                        id="senha" 
                                        name="senha"
                                        ref={elem => this.senhaInput = elem}/>
                                </div>
                                {this.state.mensagemErro && ( 
                                    <div className="loginPage__errorBox">
                                        Mensagem de erro!
                                    </div> 
                                )}
                                <div className="loginPage__inputWrap">
                                    <button 
                                        className="loginPage__btnLogin" 
                                        type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage