import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function reducer(state = { tweets: [] }, action = {}){
    switch (action.type){
        case 'CARREGA_TWEETS':
            return Object.assign({}, state, {tweets: action.payload});
        case 'ADICIONA_TWEET':
            return Object.assign(
                {}, 
                state, 
                {tweets: [ action.payload, ...state.tweets]}
            );
        case 'REMOVE_TWEET':
            return Object.assign(
                {}, 
                state, 
                {
                    tweets: state.tweets.filter(item => item._id != action.payload)
                }
            );
        case 'CURTIR_TWEET':
            const tweetCurtido = state.tweets.find(item => item._id === action.payload)
            tweetCurtido.likeado = !tweetCurtido.likeado;
            tweetCurtido.totalLikes += tweetCurtido.likeado ? +1 : -1;

            return Object.assign(
                {},
                state,
                { tweets: { ...state.tweets} }
            )

        default:
            return state;
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

console.log('Store inicial: ', store.getState());
window.store = store;

export default store;