import {
  addListener,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export const listenerMiddleware = createListenerMiddleware()

export type AppDispatch = any
export type RootState = any
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>








const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['network'],
}





