import React, { useMemo } from 'react'
import { FormContext } from './formContext'
import common from '../utils/common'

const FormInputContext = (props) => {
    const commonFunc = common()
    const defaultProps = useMemo(() => ({
        ...commonFunc
    }), [{...commonFunc}]);
    return (
        <FormContext.Provider value={defaultProps}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormInputContext
