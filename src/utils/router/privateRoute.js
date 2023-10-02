/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return <Route {...rest}>{isLoggedIn ? children : <Navigate to="/sign-in" />}</Route>
}

export default PrivateRoute
