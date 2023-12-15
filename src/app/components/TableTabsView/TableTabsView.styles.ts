import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => {
  const tabsRootStyleMap: any = {
    primary: {
      backgroundColor: theme.palette.backgrounds.light,
      borderTop: `1px solid ${theme.palette.divider}`,
      marginLeft: 0
    },
    tabsOnly: {
      backgroundColor: theme.palette.backgrounds.light,
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      marginLeft: 0
    },
    secondary: {
      marginLeft: 1,
      minHeight: 30
    }
  }

  const tabRootStyleMap: any = {
    primary: {
      borderBottom: `1px solid ${theme.palette.backgrounds.light}`,
      textTransform: 'capitalize',
      backgroundColor: theme.palette.backgrounds.light,
      minWidth: 45,
      minHeight: 80,
      marginLeft: 24,
      padding: '0 6px'
      //   '&:last-child': {
      //     borderLeft: 'none'
      //   }
    },
    tabsOnly: {
      borderBottom: `1px solid ${theme.palette.backgrounds.light}`,
      textTransform: 'capitalize',
      backgroundColor: theme.palette.backgrounds.light,
      minWidth: 45,
      minHeight: 80,
      marginLeft: 24,
      padding: '0 6px'
    },
    secondary: {
      backgroundColor: '#F5EEFF',
      color: '#141272',
      opacity: 1,
      paddingTop: 4,
      paddingBottom: 4,
      minHeight: 30
    }
  }

  const tabRootSelectedStylesMap: any = {
    primary: {
      color: '#343A47 !important',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.common.white
      //   marginBottom: -1
    },
    tabsOnly: {
      color: '#343A47 !important',
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.common.white
    },
    secondary: {
      backgroundColor: '#141272',
      marginBottom: -1,
      color: theme.palette.common.white
    }
  }

  const contentStyleMap: any = {
    primary: {
      //   border: `1px solid ${theme.palette.divider}`,
      borderTop: 'none',
      position: 'relative',
      //   top: -5,
      minHeight: 80
      //   boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)'
    },
    tabsOnly: {
      borderTop: 'none',
      position: 'relative',
      minHeight: 80
    },
    secondary: {}
  }

  return {
    indicator: {
      display: 'none'
    },
    tabsRoot: (props: any) => tabsRootStyleMap[props.variant],
    tabRoot: (props: any) => tabRootStyleMap[props.variant],
    tabRootSelected: (props: any) => tabRootSelectedStylesMap[props.variant],
    content: (props: any) => contentStyleMap[props.variant]
  }
})
