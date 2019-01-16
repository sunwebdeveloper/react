import { connect } from 'react-redux'
import * as tweetApi from './../components/api/tweetApi'
import Tweet from './../components/Tweet';

function mapStateToProps (state){
    return {};
}

function mapDispatchProps(dispatch){
    return{
        handleCurtir: async (id) => dispatch(await tweetApi.curtir(id)),
        handleRemover: async (id) => dispatch(await tweetApi.remove(id))
    };
}

export default connect(mapStateToProps, mapDispatchProps)(Tweet);