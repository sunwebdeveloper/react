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
import { connect } from 'react-redux';

import * as tweetApi from '../../components/api/tweetApi';

class Home extends Component { 
  state = {
    tweetAtivo: { usuario: {} }
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    
    dispatch(await tweetApi.carrega());  
  }

  componentDidCatch (erro) {
    this.props.history.push('/login');
  }
 
  handleRemove = async (id) => {
    // Enviar requisição
    const { dispatch } = this.props;

    dispatch(await tweetApi.remove(id))
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
    const { tweets} = this.props;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={localStorage.getItem('LOGIN')} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <TweetForm />
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <Feed
                tweets={tweets}
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

function mapStateToProps(state){
  return {
    tweets: state.tweets
  }
}

export default connect(mapStateToProps)(Home);
