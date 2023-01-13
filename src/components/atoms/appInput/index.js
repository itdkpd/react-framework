import React, { useContext } from "react"
import PasswordInput from "./passwordInput"
import { FormContext } from "../../../assets/js/context/formContext"
import useStyles from "./style"

const Input = (props) => {
    const classes = useStyles()
    const { type = 'text', name, validation, handleInputChange, handleInputBlur, required, ...componentProps } = props
    const { register, getErrors, handleChange } = useContext(FormContext)
    const errorMessage = getErrors(name)

    const inputChange = (e) => {
        handleChange(e)
        if(typeof handleInputChange === 'function') {
            handleInputChange(e)
        }
    }

    const inputBlur = (e) => {
        handleChange(e)
        if(typeof handleInputBlur === 'function') {
            handleInputBlur(e)
        }
    }

    switch (props.type) {
        case "password":
            return (
                <>
                    <PasswordInput {...register(name, { required, ...validation })} onChange={inputChange} onBlur={inputBlur}
                        {...componentProps} aria-label={`${name} input`} name={name} id={name} type={type}
                        className="form-control" />
                    {(errorMessage) &&
                        <span className={classes.errorMessage}>{errorMessage}</span>
                    }
                </>
            )
        default: return (
            <>
                <input {...register(name, { required, ...validation })} onChange={inputChange} onBlur={inputBlur}
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