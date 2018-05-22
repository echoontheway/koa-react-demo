import * as types from './actionTypes'

export const login = (req) => {
  return function (dispatch) {
    dispatch({type: types.REQUEST_LOGIN,req});
    return fetch('api/login', {
        method: 'POST', 
        body: JSON.stringify(req),
        credentials: "same-origin",
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(
        res => res.json(),
        error => console.log('An error occurred while login.', error)
      )
      .then(res => dispatch({type: types.RECEIVE_LOGIN,res}))
  }
}

export const logout = () => dispatch => {
  fetch('api/logout', {
    method: 'POST', 
    credentials: "same-origin",
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(
    res=>res.json(),
    error => console.log('An error occurred while logout.', error)
  )
  .then(res=>dispatch({ type: types.RECEIVE_LOGOUT,res}))
}
