import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography
} from '@material-ui/core'
import { ReactComponent as Arrow } from 'assets/icons/arrow.svg'
import React from 'react'
import { useStyles } from './NewsItem.style'
import classNames from 'classnames'

export interface NewsItemProps {
  link: string
  title: string
  excerpt: string
  imageLink: string
  color: 'primary' | 'secondary'
}

export const NewsItem = ({
  link,
  color = 'primary',
  title,
  excerpt,
  imageLink
}: NewsItemProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.container}>
      <CardContent
        className={classNames(classes.content, {
          [classes.fullWidth]: imageLink === null,
          [classes.secondaryContent]: color === 'secondary'
        })}
      >
        <Typography
          gutterBottom
          variant='h5'
          component='h2'
          className={classes.title}
        >
          {title}
        </Typography>
        <Typography
          variant='body1'
          component='p'
          className={classes.description}
        >
          {excerpt}
        </Typography>
        <Link
          href={link}
          target={'_blank'}
          className={classNames(classes.link, {
            [classes.secondaryLink]: color === 'secondary'
          })}
        >
          <Typography
            variant='body1'
            component='p'
            className={classes.linkText}
          >
            Read More
          </Typography>
          <Arrow />
        </Link>
      </CardContent>
      {imageLink !== null && (
        <CardMedia
          component={'div'}
          className={classNames(classes.media)}
          image={imageLink}
          title='News Image'
        />
      )}
    </Card>
  )
}
