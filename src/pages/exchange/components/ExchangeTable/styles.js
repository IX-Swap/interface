import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
    title: {
        fontSize: 25,
        fontWeight: 600,
        margin: '25px 10px',
    },
    componentStyle: {
        border: '1px solid #e8e8e8',
    },
    tableHeader: {
        fontWeight: 600,
        borderBottom: 0,
    },
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    dateContainer: {
        marginTop: 16,
    },
    filterTitle: {
        color: '#a3a3a3',
        fontSize: 12,
        fontWeight: 600,
        marginTop: 16,
    },
    dateStyle: {
        margin: '0 10px',
    },
    filterContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 16,
        borderBottom: '1px solid #e8e8e8'
    },
    buttonFilter: {
        alignItems: 'center',
        display: 'flex',
    },
    btnStyle: {
        marginRight: 15,
    },
    dateFilter: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    dropdownFilter: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 20,
        margin: '0 15px',
    },
    formControl: {
        margin: '0 10px',
        minWidth: 120,
    },
    filterBreak: {
        marginTop: 16,
        fontWeight: 600,
        fontSize: 18,
    },
}))
