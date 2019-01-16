import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as TwweetApi from './../../components/api/tweetApi'

// usar props ou trazer o state para cá?

class TweetForm extends Component {
  state = {
    textoTweet: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.props.dispatch(await TwweetApi.cria(this.state.textoTweet));
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

export default connect()(TweetForm);
