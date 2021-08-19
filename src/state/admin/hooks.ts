import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import apiService from 'services/apiService'

import { postLogin, getMe, logout } from './actions'
import { admin } from 'services/apiUrls'
import { useHistory } from 'react-router-dom'

export enum LOGIN_STATUS {
  SUCCESS,
  FAILED,
}

export enum GET_ME_STATUS {
  SUCCESS,
  FAILED,
}

export enum LOGOUT_STATUS {
  SUCCESS,
  FAILED,
}

interface Login {
  email: string
  password: string
}

export function useAdminState(): AppState['admin'] {
  return useSelector<AppState, AppState['admin']>((state) => state.admin)
}

export const login = async (data: Login) => {
  const result = await apiService.post(admin.login, data)
  return result.data
}

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>()
  const getMe = useGetMe()
  const callback = useCallback(
    async (data: Login) => {
      try {
        dispatch(postLogin.pending())
        const auth = await login(data)
        dispatch(postLogin.fulfilled({ auth }))
        await getMe()
        return LOGIN_STATUS.SUCCESS
      } catch (error: any) {
        dispatch(postLogin.rejected({ errorMessage: 'Could not login' }))
        return LOGIN_STATUS.FAILED
      }
    },
    [dispatch, getMe]
  )
  return callback
}

export const me = async () => {
  const result = await apiService.get(admin.me)
  return result.data
}

export function useGetMe() {
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(async () => {
    try {
      dispatch(getMe.pending())
      const data = await me()
      dispatch(getMe.fulfilled({ data }))
      return GET_ME_STATUS.SUCCESS
    } catch (error: any) {
      dispatch(getMe.rejected({ errorMessage: 'Could not get me' }))
      return GET_ME_STATUS.FAILED
    }
  }, [dispatch])
  return callback
}

export function useLogout() {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const callback = useCallback(() => {
    try {
      dispatch(logout.fulfilled())
      history.push('/admin-login')
      return LOGOUT_STATUS.SUCCESS
    } catch (error: any) {
      return LOGOUT_STATUS.FAILED
    }
  }, [dispatch, history])
  return callback
}
