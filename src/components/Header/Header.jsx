/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'

import avatar from '../../assets/images/avatar.jpg'

import classes from './Header.module.scss'

// eslint-disable-next-line no-unused-vars
const HeaderIsLogged = (
  <div className={classes.header__user_navigation}>
    <Link className={classes.header__create} href="#">
      Create article
    </Link>
    <div className={classes.header__user_name}>John Doe</div>
    <img className={classes.header__avatar} src={avatar} alt="Avatar" />
    <Link className={classes.header__Log_out} href="#">
      Log Out
    </Link>
  </div>
)

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.header__logo} href="#">
        Realworld Blog
      </Link>
      <div className={classes.header__authLinks}>
        <Link className={classes.header__signIn} href="#">
          Sign In
        </Link>
        <Link className={classes.header__signUp} href="#">
          Sign Up
        </Link>
      </div>
    </header>
  )
}

export default Header
