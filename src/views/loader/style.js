import { makeStyles } from '@mui/styles';

export default makeStyles({
    "@keyframes dotFlashing": {
        "0%": {
          backgroundColor: '#161b22'
        },
        "100%": {
          backgroundColor: '#fff'
        }
    },
    root: {
        height: '100%',
        backgroundColor: '#0d1117',
        display: "flex",
        "& h1": {
            color: '#f5f5f5',
            textAlign: 'center',
        },
    },
    loaderContainer: {
        padding: '25px 20px',
        alignSelf: 'center',
        margin: '0 auto',
        width: '350px',
        borderRadius: '5px',

        "& .dot-flashing": {
            position: 'relative',
            margin: '0 auto',
            width: '100%',
            height: '100%',
            display: 'inline-flex',
            columnGap: '10px',
            justifyContent: 'center',

            "& .dot-1": {
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: '#161b22',
                color: '#161b22',
                animation: '$dotFlashing 1s infinite alternate',
                animationDelay: '0.5s',
            },

            "& .dot-2": {
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: '#161b22',
                color: '#161b22',
                animation: '$dotFlashing 1s infinite alternate',
                animationDelay: '1s',
            },

            "& .dot-3": {
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: '#161b22',
                color: '#161b22',
                animation: '$dotFlashing 1s infinite alternate',
                animationDelay: '1.5s',
            },

            "& .dot-4": {
                width: '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: '#161b22',
                color: '#161b22',
                animation: '$dotFlashing 1s infinite alternate',
                animationDelay: '2s',
            }
        },
    }
});
