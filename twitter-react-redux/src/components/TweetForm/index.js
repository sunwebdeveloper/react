import React, { Component } from 'react';

// usar props ou trazer o state para cá?

class TweetForm extends Component {
  state = {
    textoTweet: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { executeOnSubmit } = this.props;
    const resposta = await fetch(
      `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
      {
        method: 'POST',
        body: JSON.stringify({ conteudo: this.state.textoTweet })
      }
    );

    if (!resposta.ok) {
      console.error('Alguma coisa deu errado!');
      return;
    }

    const respostaJSON = await resposta.json();

    executeOnSubmit(respostaJSON);
    this.setState({ textoTweet: '' });
  }

  render() {
    return (
      <form
        className="novoTweet"
        onSubmit={this.handleSubmit}
      >
        <div className="novoTweet__editorArea">
          <span
            className={`novoTweet__status ${this.state.textoTweet.length > 140 && 'novoTweet__status--invalido'}`}
          >
            {this.state.textoTweet.length}/140
          </span>
          <textarea
            className="novoTweet__editor"
            placeholder="O que está acontecendo?"
            onChange={(event) => this.setState({ textoTweet: event.target.value })}
            value={this.state.textoTweet}
          />
        </div>
        <button
          type="submit"
          className="novoTweet__envia"
          disabled={this.state.textoTweet.length > 140 || this.state.textoTweet.length <= 0}
        >
          Tweetar
        </button>
      </form>
    );
  }
}

export default TweetForm;
