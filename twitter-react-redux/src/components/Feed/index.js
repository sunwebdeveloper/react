import React from 'react'
import Tweet from './../Tweet'

const Feed = ({ tweets }) => (
    <div className="tweetsArea">
        {tweets.length ===0
            ? 'Digite algo'
            : tweets.map((item, index) => (
                <Tweet
                    key={item._id}
                    nome={`${item.usuario.nome} ${item.usuario.sobrenome}`}
                    tag={item.usuario.login}
                    imagem={item.usuario.foto}
                    likes={item.totalLikes}
                >
                    {item.conteudo}
                </Tweet>
            ))
        }
    </div>
)

export default Feed;