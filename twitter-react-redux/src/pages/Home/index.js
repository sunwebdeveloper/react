import React, { Component, Fragment } from 'react';
import Cabecalho from './../../components/Cabecalho'
import Feed from './../../components/Feed';
import NavMenu from './../../components/NavMenu'
import Dashboard from './../../components/Dashboard'
import Widget from './../../components/Widget'
import TrendsArea from './../../components/TrendsArea'
import Tweet from './../../components/Tweet';
import TweetForm from './../../components/TweetForm';
import Modal from './../../components/Modal';

class Home extends Component {
  state = {
    tweets: [],
    tweetAtivo: { usuario: {} }
  }

  componentDidMount = async () => {
    // console.log('Montei e rendereizei tudo!');
    
    const resposta = await fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`);

    if (!resposta.ok) {
      console.error('Não foi possível recuperar os tweets');
      return;
    }

    const respostaJSON = await resposta.json();
    this.setState({ tweets: respostaJSON });
  }

  componentDidCatch (erro) {
    this.props.history.push('/login');
  }

  handleSubmit = (novoTweet) => {
    this.setState({ tweets: [{ ...novoTweet, likeado: false }, ...this.state.tweets] });
  }

  handleRemove = async (id) => {
    // Enviar requisição
    const resposta = await fetch(
        `http://twitelum-api.herokuapp.com/tweets/${id}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        { method: 'DELETE' }
    );

    // Validar resposta
    if (!resposta.ok) return console.error('Algo deu errado');

    // Remoção deste tweet da lista e atualizar a minha lista
    this.setState({
      tweets: this.state.tweets.filter(item => item._id !== id)
    });
  }

  handleMostraTweet = (event, id) => {
    if (event.target.closest('.tweet__footer') !== null) {
      return;
    }

    this.setState({
      tweetAtivo: this.state.tweets.find(item => item._id === id)
    });
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={localStorage.getItem('LOGIN')} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <TweetForm executeOnSubmit={this.handleSubmit} />
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <Feed
                tweets={this.state.tweets}
                removeTweet={this.handleRemove}
                mostraTweet={this.handleMostraTweet}
              />
            </Widget>
          </Dashboard>
          <Modal
            estaAberta={this.state.tweetAtivo._id}
            fechaModal={() => this.setState({ tweetAtivo: { usuario: {} } })}
          >
            <Widget>
              {this.state.tweetAtivo._id && (
                <Tweet
                  id={this.state.tweetAtivo._id}
                  nome={`${this.state.tweetAtivo.usuario.nome} ${this.state.tweetAtivo.usuario.sobrenome}`}
                  tag={this.state.tweetAtivo.usuario.login}
                  imagem={this.state.tweetAtivo.usuario.foto}
                  likes={this.state.tweetAtivo.totalLikes}
                  likeado={this.state.tweetAtivo.likeado}
                  onRemove={this.handleRemove}
                  onShow={this.handleMostraTweet}
                >
                  {this.state.tweetAtivo.conteudo}
                </Tweet>
              )}
            </Widget>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default Home;
