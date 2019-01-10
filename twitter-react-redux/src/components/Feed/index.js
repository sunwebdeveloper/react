import React from 'react'
import Tweet from './../Tweet'

const Feed = ({ tweets }) => (
    <div className="tweetsArea">
        {tweets.length ===0
            ? 'Digite algo'
            : tweets.map((item, index) => (
                <Tweet
                    key={index}
                    nome="Rafael L Santos"
                    tag="@rafael"
                    imagem="https://bit.ly/2FhaBD0"
                    links={0}
                >
                    {item}
                </Tweet>
            ))
        }
    </div>
)

export default Feed;