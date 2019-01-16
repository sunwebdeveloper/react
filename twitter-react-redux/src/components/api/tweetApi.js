export async function carrega(dispatch){
    return async (dispatch) => {
            const resposta = await fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`);

            if (!resposta.ok) {
            console.error('Não foi possível recuperar os tweets');
            return;
            }

            const respostaJSON = await resposta.json();
            //this.setState({ tweets: respostaJSON });
            dispatch({
            type: 'CARREGA_TWEETS',
            payload: respostaJSON
            });
    }
}

export async function remove(id) {
    return async (dispatch) => {
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/tweets/${id}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            { method: 'DELETE' }
        );
    
        // Validar resposta
        if (!resposta.ok) return console.error('Algo deu errado');
    
        // Remoção deste tweet da lista e atualizar a minha lista
        //this.setState({
        //  tweets: this.state.tweets.filter(item => item._id !== id)
        //});
        dispatch({
          type: 'REMOVE_TWEET',
          payload: id
        });
    }
}

export async function cria(conteudo) {
    return async (dispatch) => {
        const resposta = await fetch(
          `http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
              method: 'POST',
              body: JSON.stringify({ conteudo })
            }
          );
      
          if (!resposta.ok) {
            console.error('Alguma coisa deu errado!');
            return;
          }
      
          const respostaJSON = await resposta.json();
      
          dispatch({
            type: 'ADICIONA_TWEET',
            payload: { ...respostaJSON, likeado: false }
          }
        );
    }
}

export async function curtir(id) {
    return async (dispatch) => {
        // Enviar requisição
        const resposta = await fetch(
            `http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            { method: 'POST' }
        );

        // Validar resposta
        if (!resposta.ok) return console.error('Algo deu errado');

        dispatch({
            type: 'CURTIR_TWEET',
            payload: id
        });
    }
}