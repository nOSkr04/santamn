import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess } from "./actions"

import { AuthApi } from "api"

function* loginUser({ payload: { user, history, setError } }) {
  try {
    const response = yield call(AuthApi.login, user)
    localStorage.setItem("authUser", JSON.stringify(response))
    yield put(loginSuccess(response))
    history("/dashboard")
    window.location.reload()
  } catch (error) {
    setError("root", { message: error.response.data.error.message })
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    const response = yield call(AuthApi.logout)
    console.log(response)
    localStorage.removeItem("authUser")
    history("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
