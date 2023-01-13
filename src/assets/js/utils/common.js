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
                    ...state,
                }
            case "setValue":
                state[action.field] = action.payload
                return {
                    ...state,
                }
            case "setState":
                return {
                    ...state,
                    ...action.payload
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

    const setState = async (param) => {
        const test = {}
        Object.keys(param).forEach(key => {
            obj.current[key].current.value = param[key]
            test[key] = param[key]
        });
        await dispatch({
            type: 'setState',
            payload: test
        })
    }

    const initState = async (initialValue) => {
        const test = {}
        Object.keys(initialValue).forEach(key => {
            if(obj.current[key]?.current) {
                obj.current[key].current.value = initialValue[key] || ""
            } else {
                watch(key, initialValue[key])
            }

            test[key] = initialValue[key]
        });
        await dispatch({
            type: 'setState',
            payload: test
        })
    }

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
            if(errorHandler?.required && !errorHandler?.message) {
                const errors = errorHandlers.current
                errors[name] = { required: true, message: `${name} field is required`, show: false }
                errorHandlers.current = errors
            } else if(errorHandler?.required && errorHandler?.message) {
                const errors = errorHandlers.current
                errors[name] = { required: true, message: errorHandler?.message, show: false }
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
            const val = {}
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
        if(obj.current[name]?.current) {
            obj.current[name].current.value = initValue || ""
        } else {
            obj.current[name] = {
                current: {
                    value: initValue || ""
                }
            }
        }
        
        object[name] = initValue || ""
        watchers.current = object
        setValue(name, initValue || "")
    }

    return {
        initState,
        register,
        setValue,
        setState,
        handleChange,
        getValues,
        watch,
        getErrors,
        getState: getValues
    }
}

export {
    common
}