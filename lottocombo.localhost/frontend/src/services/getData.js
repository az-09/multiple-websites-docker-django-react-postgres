import { CONNECTION_ERROR, GET_ERROR, GET_LOADING, GET_SUCCESS } from '../contexts/actions'
import axiosHelper from '../utils/axiosHelper'

const getData = (url) => (dispatch) => {
    dispatch({
        type: GET_LOADING
    })

    axiosHelper()
        .get(url)
        .then((res) => {
            dispatch({
                type: GET_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            })
        })
}

export default getData
