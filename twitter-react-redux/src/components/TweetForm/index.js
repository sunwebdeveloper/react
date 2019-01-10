import React, { Component } from 'react';

// usar props ou trazer o state para cá?

class TweetForm extends Component {
  state = {
    textoTweet: ''
  }

  render() {
    const { executeOnSubmit } = this.props;

    return (
      <form
        className="novoTweet"
        onSubmit={(e) => {
          e.preventDefault();

          executeOnSubmit(this.state.textoTweet);
          this.setState({ textoTweet: '' });
        }}
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