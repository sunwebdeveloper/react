import React from 'react'
import Tweet from './../Tweet'

const Feed = ({ tweets, removeTweet, mostraTweet }) => (
    <div className="tweetsArea">
        {tweets.length ===0
            ? 'Digite algo'
            : tweets.map((item, index) => (
                <Tweet                    
                    key={item._id}
                    id={item._id}
                    nome={`${item.usuario.nome} ${item.usuario.sobrenome}`}
                    tag={item.usuario.login}
                    likeado={item.item_is}
                    imagem={item.usuario.foto}    
                    likes={item.totalLikes}
                    likeado={item.likeado}
                    onRemove={removeTweet}
                    onShow={mostraTweet}
                    //removivel={localStorage.getItem('LOGIN')===tag}
                >
                    {item.conteudo}
                </Tweet>
            ))
        }
    </div>
)

Feed.propTypes = {

};

Feed.defaultProps = {

};


export default Feed;