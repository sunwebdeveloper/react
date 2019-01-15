import React, { Component } from 'react'
import propTypes from 'prop-types';

import './tweet.css'

class Tweet extends Component {
    state = {
        likeado: this.props.likeado,
        totalLikes: this.props.likes
    }

    static propTypes = {
        imagem: propTypes.string,
        id:propTypes.string.isRequired,
        nome: propTypes.string.isRequired,
        tag: propTypes.string.isRequired,
        likeado: propTypes.bool,
        children:propTypes.string.isRequired,
        likes: propTypes.number
    }

    static defaultProps = {
        imagem: 'http://www.socialbits.com.br/wp-content/uploads/2015/03/user.png',
        likes: 0
    }

    handleCurtir = async (id) => {             
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/twetts/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST'
        });
        
        if(!resposta.ok) return console.error('Algo deu errado!');

        this.setState = ((stateanterior) => ({
            likeado: !stateanterior.likeado,
            likes: stateanterior.likes + (stateanterior.likado ? -1 : 1)
        }));
    }

    render() {
        const { imagem, nome, tag, children, onRemove, onShow } = this.props;
        const { likeados, likes } = this.state;
        const tweetremovivel = localStorage.getItem('LOGIN') === tag

        return (
            <article className="tweet" onClick={ (id) => onShow(id) } >
                <div className="tweet__cabecalho">
                    <img className="tweet__fotoUsuario" src={imagem} alt="" />
                    <h1 className="tweet__nomeUsuario">{nome}</h1>
                    <a href="/"><span className="tweet__userName">@{tag}</span></a>
                </div>
                <p className="tweet__conteudo">
                    <span>{children}</span>
                </p>
                <footer className="tweet__footer">
                    <button className="btn btn--clean">
                        <svg 
                            className={`icon icon--small iconHeart ${this.state.likeado && 'iconHeart--active'}`}
                             onClick={this.handleCurtir}
                             xmlns="http://www.w3.org/2000/svg" 
                             viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        {likes}
                    </button>
                    {tweetremovivel && (
                        <button onClick={(id) => onRemove({id})} className='btn btn--blue btn--remove'>
                            X
                        </button>
                    )}
                    
                </footer>
            </article>
        )
    }
}

export default Tweet