/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useRegisterUserMutation } from '../../api/api'
import { setUser } from '../../redux/auth/auth.slice'

import classes from './SignUp.module.scss'

export default function SignUp() {
  const [registerUser, result] = useRegisterUserMutation()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
  } = useForm({
    mode: 'onchange',
  })

  useEffect(() => {
    if (result.isSuccess) {
      localStorage.setItem('token', result.data.user.token)
      dispatch(setUser(result.data.user))
    }
    if (isLoggedIn || result.isSuccess || result.data?.user) {
      navigate('/articles')
    }
  }, [result, navigate, isLoggedIn])

  const watchPassword = watch('password', '')

  const onSubmit = (data) => {
    const { username, email, password } = data
    registerUser({ username, email, password })
    reset()
  }

  useEffect(() => {
    if (result.error) {
      Object.entries(result.error.data.errors).forEach(([key, value]) => {
        setError(key, { type: 'custom', message: `${key} ${value}` })
      })
    }
  }, [result])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.signup_form}>
      <div className={classes.signup_form__container}>
        <h2 className={classes.signup_form__title}>Create new account</h2>
        <label className={classes.signup_form__label}>Username</label>
        <input
          className={`${classes.signup_form__input} ${errors?.username ? classes.input_error : ''}`}
          {...register('username', {
            required: 'Name is required field',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must not exceed 20 characters',
            },
          })}
          type="text"
          placeholder="Username"
        />
        {errors?.username && <div className={classes.signup_form__message}>{errors.username.message}</div>}
        <label className={classes.signup_form__label}>Email address</label>
        <input
          className={`${classes.signup_form__input} ${errors?.email ? classes.input_error : ''}`}
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
        {errors?.email && <div className={classes.signup_form__message}>{errors.email.message}</div>}
        <label className={classes.signup_form__label}>Password</label>
        <input
          className={`${classes.signup_form__input} ${errors?.password ? classes.input_error : ''}`}
          {...register('password', {
            required: 'Password is required field',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password must not exceed 40 characters',
            },
            pattern: {},
          })}
          type="password"
          placeholder="Password"
        />
        {errors?.password && <div className={classes.signup_form__message}>{errors.password.message}</div>}
        <label className={classes.signup_form__label}>Repeat Password</label>
        <input
          className={`${classes.signup_form__input} ${errors?.repeatPassword ? classes.input_error : ''}`}
          {...register('repeatPassword', {
            required: 'Repeat Password is required field',
            validate: (value) => value === watchPassword || 'Passwords must match',
            pattern: {},
          })}
          type="password"
          placeholder="Password"
        />
        {errors?.repeatPassword && <div className={classes.signup_form__message}>{errors.repeatPassword.message}</div>}
        <label className={classes.signup_form__checkbox_label}>
          <input
            className={classes.signup_form__checkbox}
            {...register('personalInformation', {
              required: 'You must agree to the processing of your personal information',
              pattern: {},
            })}
            type="checkbox"
          />
          I agree to the processing of my personal information
        </label>
        {errors?.personalInformation && (
          <div className={classes.signup_form__message}>{errors.personalInformation.message}</div>
        )}
        <button className={classes.signup_form__submit_button} type="submit">
          Create
        </button>
        <div className={classes.signup_form__signin_container}>
          <label className={classes.signup_form__sigin_text}>Already have an account?</label>
          <Link to="/sign-in" className={classes.signup_form__signin_link} href="#">
            Sign In.
          </Link>
        </div>
        <div />
      </div>
    </form>
  )
}
