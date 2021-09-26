import { CLEAR_SEARCH, GET_ERROR, GET_LOADING, GET_SUCCESS } from './actions'
import { initialState } from './Provider'

const reducer = (state, {type, payload}) => {
    switch(type){
        case GET_LOADING:
            return{
                ...state,
                loading: true,
                error: false,
            }
        case GET_SUCCESS:
            return{
                ...state,
                loading: false,
                data: payload
            }
        case GET_ERROR:
            return{
                ...state,
                loading: false,
                error: payload
            }

        case CLEAR_SEARCH:{
            return{
                ...initialState
            }
        }

        default:
            return state
    }
}

export default reducer