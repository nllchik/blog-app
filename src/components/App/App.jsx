import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../Header'
import PostList from '../PostList'
import PostDetails from '../PostDetails'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import EditProfile from '../EditProfile'
import CreateArticle from '../CreateArticle'
import EditArticle from '../EditArticle'
import { useGetCurrentUserQuery } from '../../api/api'
import { setUser } from '../../redux/auth/auth.slice'

import classes from './App.module.scss'

function App() {
  const localToken = localStorage.getItem('token')
  const { data, isSuccess } = useGetCurrentUserQuery(localToken, {
    skip: !localToken,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data.user))
    }
  }, [localToken, isSuccess, data, dispatch])

  return (
    <main className={classes.main}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<PostList />} />
        <Route path="/details" element={<PostDetails />} />
        <Route path="/articles/:slug" element={<PostDetails />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new-article" element={<CreateArticle />} />
      </Routes>
    </main>
  )
}

export default App
