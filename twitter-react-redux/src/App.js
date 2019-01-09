import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'
import TweeterForm from './components/TweetForm'

class App extends Component {
   state = {
        tweets: []
   }

   handleSubmit(novoTweet){
       this.setState({tweets:[novoTweet, ...this.state.tweets]});
   }

  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="Pele" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <TweeterForm />
                    
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        {this.state.tweets.length === 0
                            ? 'Digite algo'
                            : this.state.tweets.map((item, index) => (
                                    <Tweet 
                                        key={index}
                                        nome='Rafael Leandro'
                                        tag='rafaelleandro'
                                        imagem={'http://pogmogoal.com/wp-content/uploads/young-pele.jpg'}
                                        likes={0}>        
                                        {item}
                                    </Tweet>
                                )                                 
                            )
                        }                        
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
