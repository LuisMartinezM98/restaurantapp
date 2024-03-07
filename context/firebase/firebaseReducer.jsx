import { useReducer } from "react";
import { OBTENER_PRODUCTOS_EXITO, OBTENER_PRODUCTOS_INICIO } from "../../types";

export default(state, action) => {
    switch(action.type){
        case OBTENER_PRODUCTOS_INICIO:
            return{
                ...state,
                cargando: true
            }
        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu: action.payload,
                cargando: false
            }
        default:
            return state
    }
}