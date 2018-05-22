import { combineReducers } from 'redux'
import * as types from './actionTypes'

function loginOrOut(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
    return Object.assign({}, state, {
      isFetching: true
    })
    case types.RECEIVE_LOGIN:
    return Object.assign({}, state, {
      isFetching: false,
      userInfo:action.res
    })
    case types.RECEIVE_LOGOUT:
    return Object.assign({}, state, {
      userInfo:action.res
    })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  loginOrOut
})

export default rootReducer