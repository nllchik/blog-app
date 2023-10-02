/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useCreatePostMutation, useGetCurrentUserQuery } from '../../api/api'

import classes from './CreateArticle.module.scss'

export default function CreateArticle() {
  const [createPost, result] = useCreatePostMutation()
  const localToken = localStorage.getItem('token')
  const navigate = useNavigate()
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const { data: currentUser, isSuccess: isUserFetchSuccess } = useGetCurrentUserQuery(localToken, {
    skip: !localToken,
  })
  const { slug } = useParams()

  useEffect(() => {
    if (result.isSuccess) {
      navigate('/articles')
    }
    if (isUserFetchSuccess && !currentUser && localToken) {
      navigate('/sign-in')
    }
  }, [result.isSuccess, navigate, currentUser, localToken, isUserFetchSuccess])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: 'onchange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (data) => {
    console.log('data >', data)
    const payload = { token: localToken, post: data }
    console.log('payload >', payload)
    createPost(payload)
    remove()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.newArticle_form}>
      <div className={classes.newArticle_form__container}>
        <h2 className={classes.newArticle_form__title}>Create new article</h2>
        <label className={classes.newArticle_form__label}>Title</label>
        <input
          className={`${classes.newArticle_form__input} ${errors?.title ? classes.input_error : ''}`}
          {...register('title', {
            required: 'title is required field',
            pattern: {
              message: 'Please enter valid mail',
            },
          })}
          type="text"
          placeholder="Title"
        />
        {errors?.title && <div className={classes.newArticle_form_message}>{errors.title.message}</div>}
        <label className={classes.newArticle_form__label}>Short description</label>
        <input
          className={`${classes.newArticle_form__input} ${errors?.description ? classes.input_error : ''}`}
          {...register('description', {
            required: 'description is required field',
            pattern: {},
          })}
          type="text"
          placeholder="Title"
        />
        {errors?.description && <div className={classes.newArticle_form_message}>{errors.description.message}</div>}
        <label className={classes.newArticle_form__label}>Text</label>
        <textarea
          rows="9"
          className={`${classes.newArticle_form__input_body} ${errors?.body ? classes.input_error : ''}`}
          {...register('body', {
            required: 'body is required field',
            pattern: {},
          })}
          type="text"
          placeholder="Text"
        />
        {errors?.body && <div className={classes.newArticle_form_message}>{errors.body.message}</div>}
        <label className={classes.newArticle_form__label_tags}>Tags</label>
        <div className={classes.newArticle_form__tags}>
          <div>
            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <span>
                    <input
                      className={classes.newArticle_form__tag}
                      {...register(`tagList.${index}`, { required: true })}
                      placeholder="Tag"
                    />
                    <button
                      className={classes.newArticle_form__delete_button}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              )
            })}
          </div>
          <button
            className={classes.newArticle_form__add_button}
            type="button"
            onClick={() => {
              append('')
            }}
          >
            Add tag
          </button>
        </div>
        <button className={classes.newArticle_form__submit_button} type="submit">
          Send
        </button>
        <div />
      </div>
    </form>
  )
}
