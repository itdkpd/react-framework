import React, { forwardRef } from "react"

const PasswordInput = forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props} className="form-control" />
    )
})

export default PasswordInput