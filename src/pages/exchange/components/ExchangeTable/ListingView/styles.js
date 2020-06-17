import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
    pageTitle: {
        color: '#000',
        fontWeight: 600,
        fontSize: 25,
        marginRight: 15,
    },
    subTitle: {
        color: '#a3a3a3',
        fontSize: 12,
        margin: '15px 0 0',
    },
    pageLink: {
        marginRight: 40,
    },
    cotentContainer: {
        marginTop: 40,
    },
    content: {
        border: '1px solid #e8e8e8',
        borderRadius: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12)',
        marginLeft: 60,
        padding: '30px 50px',
    },
    innerContent: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    avatarInfo: {
        alignItems: 'center',
        display: 'flex',
    },
    listItemInfo: {
        padding: '0px 20px',
    },
    listTitle: {
        marginRight: 15,
        fontSize: 12,
        lineHeight: 1.5,
    },
    listPrice: {
        display: 'flex',
        alignItems: 'flex-end',
        fontWeight: 600,
        fontSize: 12,
        lineHeight: 1.5,
    },
    listSymbol: {
        fontSize: 18,
        marginRight: 20, 
        lineHeight: 1.5,
    },
    listPercentage: {
        fontSize: 20,
        lineHeight: 1.5,
    },
    companyContainer: {
        marginTop: 35,
        marginBottom: 20,
    },
    companyName: {
        fontSize: 12,
        fontWeight: 600,
    },
    companyValue: {
        fontSize: 12,
        marginLeft: 10,
    },
    listDescContainer: {
        border: '1px solid #ebebeb',
        borderRadius: 1,
        marginTop: 30,
        padding: 40,
    },
    listDescTitle: {
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 25,
    },
    listDesc: {
        wordBreak: 'break-word',
    }
}))
