import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => {
  const tabsRootStyleMap: any = {
    primary: { marginLeft: 0 },
    secondary: {
      marginLeft: 1,
      minHeight: 30
    }
  }

  const tabRootStyleMap: any = {
    primary: {
      border: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid transparent`,
      backgroundColor: theme.palette.backgrounds.light,
      minHeight: 37,
      paddingTop: 6,
      paddingBottom: 6,
      '&:last-child': {
        borderLeft: 'none'
      }
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
      borderBottom: `1px solid ${theme.palette.common.white}`,
      backgroundColor: theme.palette.common.white,
      marginBottom: -1
    },
    secondary: {
      backgroundColor: '#141272',
      marginBottom: -1,
      color: theme.palette.common.white
    }
  }

  const contentStyleMap: any = {
    primary: {
      border: `1px solid ${theme.palette.divider}`,
      borderTop: 'none',
      position: 'relative',
      top: -5,
      minHeight: 80,
      boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)'
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
