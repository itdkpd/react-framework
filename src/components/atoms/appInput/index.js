import React, { useContext } from "react"
import PasswordInput from "./passwordInput"
import { FormContext } from "../../../assets/js/context/formContext"
import useStyles from "./style"
const Input = (props) => {
    const { register, getErrors, handleChange } = useContext(FormContext)
    const { type = 'text', name, validation, handleInputChange, ...componentProps } = props
    const errorMessage = getErrors(name)
    const classes = useStyles()

    const inputChange = (e) => {
        handleChange(e)
        if(typeof handleInputChange === 'function') {
            handleInputChange(e)
        }
    }

    switch (props.type) {
        case "password":
            return (
                <>
                    <PasswordInput {...register(name, validation)} onChange={inputChange}
                        {...componentProps} aria-label={`${name} input`} name={name} id={name} type={type}
                        className="form-control" />
                    {(errorMessage) &&
                        <span className={classes.errorMessage}>{errorMessage}</span>
                    }
                </>
            )
        default: return (
            <>
                <input {...register(name, validation)} onChange={inputChange}
                    {...componentProps} aria-label={`${name} input`} name={name} id={name} type={type}
                    className="form-control" />
                {(errorMessage) &&
                    <span className={classes.errorMessage}>{errorMessage}</span>
                }
            </>
        )
    }
}

const areEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(Input, areEqual)