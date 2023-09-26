import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { api } from '../api/api'

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
