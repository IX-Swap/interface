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

export interface NewsItemProps {
  title: string
  excerpt: string
  link: string
  imageLink: string
}

export const NewsItem = ({
  title,
  excerpt,
  link,
  imageLink
}: NewsItemProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.container}>
      <CardContent className={classes.content}>
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
        <Link href={link} className={classes.button} target={'_blank'}>
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
      <CardMedia
        component={'div'}
        className={classes.media}
        image={imageLink}
        title='News Image'
      />
    </Card>
  )
}
