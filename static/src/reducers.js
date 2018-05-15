import { combineReducers } from 'redux'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './actions'

function postsByLogin(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      userInfo:action.userInfo
    })
    case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true
    })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByLogin
})

export default rootReducer