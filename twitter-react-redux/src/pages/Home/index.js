import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import Feed from '../../components/Feed'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import TweeterForm from '../../components/TweetForm'
import Modal from '../../components/Modal'

import './../../assets/css/container.css'
import Tweet from '../../components/Tweet';

//leticia.costa@caelum.com.br

class Home extends Component {
   state = {
        tweets: [],
        tweetAtivo: {}
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

   componentDidCatch(err){
       alert('Alguma coisa deu errada. '+err)
   }

   handleSubmit = (novoTweet) => {
       this.setState({ tweets: [{ ...novoTweet, likeado: false }, ...this.state.tweets,] });
   }

   handleRemove = async (id) => {
    const resposta = await fetch(
        `http://twitelum-api.herokuapp.com/twetts/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        {method: 'DELETE' }
    );

    if(!resposta.ok) return console.error('Algo deu errado!');

    this.setState({
        tweets: this.state.tweets.filter((item) => item._id !== id)
    });
   }

   handleMostraTweet = (event, id) => {
       this.setState({
           tweetAtivo: this.state.tweets.find(item => item._id === id)
       })
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
                    <TweeterForm executeOnSubmit={this.handleSubmit}/>                    
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <Feed tweets={this.state.tweets} 
                          removeTweet={this.handleRemove}
                          mostraTweet={this.handleMostraTweet}
                    />
                </Widget>
            </Dashboard>
            <Modal 
                estaAberta={this.state.tweetAtivo._id} 
                fechaModal={ () => this.setState({ tweetAtivo : {} }) }
            >
                <Widget>
                    <Tweet></Tweet>
                </Widget>
            </Modal>
            
        </div>
      </Fragment>
    );
  }
}

export default Home;
