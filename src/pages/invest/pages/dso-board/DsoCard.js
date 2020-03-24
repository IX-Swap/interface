import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import MUIRichTextEditor from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: '100%'
      },
      editor: {
        padding: 10
      }
    }
  }
})

export default function DsoCard (props) {
  const { dso, history } = props
  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item sm={7} md={8} lg={8}>
            <img width={100} height={100} src={dso.logo} />
            <Box pt={3} pb={2}>
              <Typography variant='h3' component='h2'>
                {dso.title}
              </Typography>
            </Box>

            <Typography variant='body2' component='p'>
              <span
                dangerouslySetInnerHTML={{
                  __html: dso.summary
                }}
              />
            </Typography>
          </Grid>
          <Grid item sm={5} md={4} lg={4}>
            <Box display='flex' justifyContent='flex-end' m={1} p={1}>
              <Chip label={dso.status} clickable color='primary' />
            </Box>
            <Typography variant='h5' component='h2'>
              Highlights
            </Typography>
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                value={dso.highlights}
                toolbar={false}
                readOnly={true}
                controls={[
                  'title',
                  'bold',
                  'italic',
                  'underline',
                  'link',
                  'numberList',
                  'bulletList',
                  'save'
                ]}
              />
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Box p={3}>
          <Button
            variant='contained'
            color='default'
            size='small'
            onClick={() => props.history.push(`/app/invest/${dso._id}`)}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
