/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import { parse, format } from 'date-fns'

import defaultAvatar from '../../assets/images/avatar.png'

import classes from './PostCard.module.scss'

function PostCard({ post }) {
  const { author, createdAt, description, favoritesCount, title } = post
  const tags = post.tagList.filter((tag) => tag.trim()).map((tag, index) => (
    <div className={classes.info_tags} key={`${tag}-${index}`}>
      {tag}
    </div>
  ))

  const formattedDate = createdAt
    ? format(parse(createdAt, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSX', new Date()), 'MMMM d, yyyy')
    : 'Date unknown'

  function truncateText(text, maxLength) {
    if (!text) {
      return ''
    }
    if (text.length <= maxLength) {
      return text
    }
    const truncatedText = `${text.slice(0, maxLength)}...`
    return truncatedText
  }

  return (
    <div className={classes.card}>
      <div className={classes.card__content}>
        <div className={classes.card__info}>
          <div className={classes.info_header}>
            <Link to={`/articles/${post.slug}`}>
              <h2 className={classes.info_title}>{truncateText(title, 45)}</h2>
            </Link>
            <div className={classes.info_likes}>🤍 {favoritesCount}</div>
          </div>
          <div className={classes.info_tag_container}>{tags}</div>
        </div>
        <div className={classes.card__user}>
          <div className={classes.user_userInfo}>
            <div className={classes.user_userName}>{author.username}</div>
            <div className={classes.user_postDate}>{formattedDate}</div>
          </div>
          <img className={classes.user__avatar} src={author.image ? author.image : defaultAvatar} alt="Avatar" />
        </div>
      </div>
      <p className={classes.card__text}>{truncateText(description, 300)}</p>
    </div>
  )
}

export default PostCard
