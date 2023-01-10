/* eslint-disable*/
import { useContext, useEffect, useReducer, useRef, useMemo } from 'react'

export const inputFormReducer = useMemo(() => (state, action) => {
    switch (action.type) {
        case "handleChange":
            state[action.field] = action.payload
            return {
                ...state
            }
        case "setValue":
            console.log('setval')
            state[action.field] = action.payload
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
        default: return state
    }
})

export const inputFormHandler = (ref, initValue) => {
    Object.keys(initValue).forEach(key => {
        initValue[`${key}OldValue`] = ''
    });

    const [values, dispatch] = useReducer(inputFormReducer, initValue);

    return {
        values,
        dispatch,
        clear: async (field) => {
            await dispatch({
                type: "clear",
                field
            })
        },
        oldValue: (field) => {
            return values[`${field}OldValue`]
        },
        setValue: async (field, value) => {
            return new Promise(async(resolve, reject) => {
                await dispatch({
                    type: "setValue",
                    field,
                    payload: value
                })
                ref.current.value = value
                resolve(ref.current.value)
            })
        }
    }
}