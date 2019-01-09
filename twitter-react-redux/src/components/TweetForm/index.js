import React, { Component, Fragment } from 'react'

class TweetForm extends Component {
    state = {
        textoTweet: ''
    }

    render() {
       
        return (
            <form className="novoTweet" onSubmit={(e)=>{
                e.preventDefault();
                this.setState({
                    tweets: [this.state.textoTweet, ... this.state.tweets],
                    textoTweet: ''
                });
            }}>
                <div className="novoTweet__editorArea">
                    <span className='novoTweet__status'>                                                            
                        {this.state.textoTweet.length}/140
                    </span>
                    <textarea 
                        className="novoTweet__editor" 
                        placeholder="O que está acontecendo?"
                        onChange={(event) => this.setState({ textoTweet: event.target.value })}
                        value={this.state.textoTweet}
                        />
                </div>
                <button type="submit" 
                        disabled={this.state.textoTweet.length>140 || this.state.textoTweet.length===0} 
                        className="novoTweet__envia">
                    Tweetar
                </button>
            </form>
        )
    }
}

export default TweetForm