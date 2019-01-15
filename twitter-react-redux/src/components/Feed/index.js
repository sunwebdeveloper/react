import React from 'react';
import propTypes from 'prop-types';
import Tweet from './../Tweet';

// const login = localStorage.getItem('LOGIN');

const Feed = ({ tweets, removeTweet, mostraTweet }) => (
  <div className="tweetsArea">
    {tweets.length === 0
      ? 'Digite algo'
      : tweets.map((item) => (
        <Tweet
          key={item._id}
          id={item._id}
          nome={`${item.usuario.nome} ${item.usuario.sobrenome}`}
          tag={item.usuario.login}
          imagem={item.usuario.foto}
          likes={item.totalLikes}
          likeado={item.likeado}
          onRemove={removeTweet}
          onShow={mostraTweet}
          // removivel={login === item.usuario.login}
        >
          {item.conteudo}
        </Tweet>
      ))
    }
  </div>
);

Feed.propTypes = {
  tweets: propTypes.arrayOf(
    propTypes.shape({
      usuario: propTypes.object,
      totalLikes: propTypes.number,
      _id: propTypes.string,
      conteudo: propTypes.string
    })
  )
};

Feed.defaultProps = {
  tweets: []
};

export default Feed;
