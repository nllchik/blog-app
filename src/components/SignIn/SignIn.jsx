/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../../redux/auth/auth.slice'
import { useLoginUserMutation } from '../../api/api'

import classes from './SignIn.module.scss'

export default function SignIn() {
  const [loginUser, result] = useLoginUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onchange',
  })

  useEffect(() => {
    if (result.isSuccess) {
      localStorage.setItem('token', result.data.user.token)
      dispatch(setUser(result.data.user))
    }
    if (isLoggedIn || (result.isSuccess && result.data?.user)) {
      navigate('/articles')
    }
  }, [result, navigate, isLoggedIn])

  const onSubmit = ({ email, password }) => {
    loginUser({ email, password })
    reset()
  }

  const errorMessage = (name) => {
    return errors?.[name] && <div className={classes.signin_form__message}>{errors[name].message}</div>
  }

  const serverErrorMessage = result.error ? (
    <div className={classes.signin_form__serverMessage}>Email or Password is invalid</div>
  ) : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.signin_form}>
      <div className={classes.signin_form__container}>
        <h2 className={classes.signin_form__title}>Sign In</h2>
        <label className={classes.signin_form__label}>Email address</label>
        <input
          className={`${classes.signin_form__input} ${errors?.email || result.error ? classes.input_error : ''}`}
          {...register('email', {
            required: 'Email is required field',
            pattern: {
              value: /^[\w-_.]+@[\w-]+\.[\w-.]+$/,
              message: 'Please enter valid mail',
            },
          })}
          type="text"
          placeholder="Email address"
        />
        {errorMessage('email')}
        <label className={classes.signin_form__label}>Password</label>
        <input
          className={`${classes.signin_form__input} ${errors?.password || result.error ? classes.input_error : ''}`}
          {...register('password', {
            required: 'Password is required field',
            pattern: {},
          })}
          type="password"
          placeholder="Password"
        />
        {errorMessage('password')}
        {serverErrorMessage}
        <button className={classes.signin_form__submit_button} type="submit">
          Login
        </button>
        <div className={classes.signin_form__signin_container}>
          <label className={classes.signin_form__signin_text}>Don’t have an account?</label>
          <Link to="/sign-up" className={classes.signin_form__signin_link}>
            Sign Up.
          </Link>
        </div>
        <div />
      </div>
    </form>
  )
}
