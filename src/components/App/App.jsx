import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Header from '../Header'
import PostList from '../PostList'
import PostDetails from '../PostDetails'

import classes from './App.module.scss'

function App() {
  return (
    <main className={classes.main}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<PostList />} />
        <Route path="/details" element={<PostDetails />} />
        <Route path="/articles/:slug" element={<PostDetails />} />
      </Routes>
    </main>
  )
}

export default App
