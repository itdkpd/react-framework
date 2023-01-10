import { useEffect, useReducer, useRef, useMemo } from "react"

const common = () => {
    let obj = useRef({})
    let errorHandlers = useRef({})
    let watchers = useRef({})
    const inputFormReducer = useMemo(() => (state, action) => {
        switch (action.type) {
            case "handleChange":
                state[action.field] = action.payload
                return {
                    ...state
                }
            case "setValue":
                state[action.field] = action.payload

                return {
                    ...state
                }
            case "setError":
                state[`${action.field}errorMessage`] = action.payload
                return {
                    ...state
                }
            case "clear":
                if(!action.field) {
                    Object.keys(state).forEach(key => {
                        state[key] = ''
                    });
                } else {
                    state[action.field] = ''
                }
                return {
                    ...state
                }
            case "unregister":
                state = {}
                return {
                    ...state
                }
            default: return state
        }
    })

    const [values, dispatch] = useReducer(inputFormReducer, {})

    const setValue = async (name, value) => {
        const errors = errorHandlers.current
        obj.current[name].current.value = value
        const watch = watchers.current
        if(name && watch.hasOwnProperty(name)) {
            await dispatch({
                type: 'setValue',
                field: name,
                payload: value
            })
        } else if(name && errors.hasOwnProperty(name)) {
            if(!value && !errors[name].show) {
                errors[name].show = true
                await dispatch({
                    type: 'setError',
                    field: name,
                    payload: errors[name].message
                })
            } else if(value && errors[name].show) {
                errors[name].show = false
                await dispatch({
                    type: 'setError',
                    field: name,
                    payload: ''
                })
            }
        }
        return value
    }

    const handleChange = async (e) => {
        const errors = errorHandlers.current
        const componentName = e.target.name
        const componentValue = e.target.value

        setValue(componentName, componentValue)
        if(errors[componentName] && errors[componentName].required && errors.hasOwnProperty(componentName)) {
            if(!componentValue && !errors[componentName].show) {
                errors[componentName].show = true
                await dispatch({
                    type: 'setError',
                    field: componentName,
                    payload: errors[componentName].message
                })
            } else if(componentValue && errors[componentName].show) {
                errors[componentName].show = false
                await dispatch({
                    type: 'setError',
                    field: componentName,
                    payload: ''
                })
            }
        }

        errorHandlers.current = errors
    }

    const register = (name, errorHandler) => {
        const ref = useRef(name)
        obj.current[name] = ref

        useEffect(() => {
            if(errorHandler?.required) {
                const errors = errorHandlers.current
                errors[name] = { required: true, message: 'required', show: false }
                errorHandlers.current = errors
            }

            return async () => {
                delete obj.current[name]
                delete errorHandlers.current[name]
                delete watchers.current[name]

                await dispatch({
                    type: 'unregister'
                })
            };
        }, [])

        return {
            ref,
            onChange: handleChange
        }
    }

    const getValues = (name) => {
        const watch = watchers.current

        if(name || (name && watch.hasOwnProperty(name))) {
            return obj.current[name]?.current.value
        } else {
            const val = []
            Object.keys(obj.current).forEach(key => {
                val[key] = obj.current[key]?.current.value
            });
            return val
        }
    }

    const getErrors = (name) => {
        const errors = errorHandlers.current
        if(name && errors.hasOwnProperty(name) && values.hasOwnProperty(`${name}errorMessage`)) {
            if(errors[name].show) {
                return values[`${name}errorMessage`]
            } else {
                return ""
            }
        } else {
            return errors.current
        }
    }

    const watch = (name, initValue) => {
        const object = watchers.current
        object[name] = initValue || ""
        watchers.current = object
    }

    return {
        register,
        setValue,
        handleChange,
        getValues,
        watch,
        getErrors
    }
}

export default common