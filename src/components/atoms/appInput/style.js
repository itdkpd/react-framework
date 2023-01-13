import { makeStyles } from '@mui/styles';

export default makeStyles({
    errorMessage: {
        color: '#cc0033',
        display: 'block',
        fontSize: '12px',
        lineHeight: '12px',
        marginBottom: '5px',

        '&::first-letter': {
            textTransform: 'capitalize'
        }
    }
});
