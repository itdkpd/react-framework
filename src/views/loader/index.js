import React from 'react'
import useStyles from './style'

const Loader = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.loaderContainer}>
                <h1>Loading</h1>
                <div className="dot-flashing">
                    <div className="dot-1"></div>
                    <div className="dot-2"></div>
                    <div className="dot-3"></div>
                    <div className="dot-4"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader
