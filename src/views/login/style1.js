import { makeStyles } from '@mui/styles';

export default makeStyles({
    root: {
        minHeight: '100%',
        backgroundColor: '#0d1117',
        "& h1": {
            color: '#f5f5f5',
            textAlign: 'center',
            margin: '20px 0'
        },

        "& label": {
            fontSize:'14px',
            color:'#f5f5f5'
        },

        "& input.form-control": {
            border: '1px solid #30363d',
            backgroundColor: '#0d1117',
            color: '#f5f5f5',
            borderRadius:'5px',
            "&[disabled]": {
                cursor:'not-allowed',
                borderColor:'#c4c4c4',
            }
        },

        '& input[type="submit"]': {
            borderRadius: '5px'
        },

        '& input[type="button"]': {
            borderRadius: '5px',
            "&:focus-visible": {
                outline: 'none'
            }
        }
    },
    loginContainer: {
        padding: '25px 20px',
        alignSelf: 'flex-start',
        backgroundColor: '#161b22',
        margin: '0 auto',
        width: 'calc(100% - 32px)',
        maxWidth: '350px',
        borderRadius: '5px'
    },
});
