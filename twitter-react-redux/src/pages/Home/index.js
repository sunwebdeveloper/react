import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import Feed from '../../components/Feed'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import TweeterForm from '../../components/TweetForm'

import './../../assets/css/container.css'

//leticia.costa@caelum.com.br

class Home extends Component {
   state = {
        tweets: []
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
       this.setState({ tweets: [novoTweet, ...this.state.tweets,] });
   }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="Rafael" />
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
                    <Feed tweets={this.state.tweets} />
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
