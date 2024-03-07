import { useReducer } from "react";

import firebase from "../../firebase";
import firebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import { OBTENER_PRODUCTOS_EXITO, OBTENER_PRODUCTOS_INICIO } from '../../types'

import _ from 'lodash';

const FirebaseState = props => {

    const initialState = {
        menu: [],
        cargando: false,
    }

    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(firebaseReducer, initialState);

    // Funcion que se ejecuta para obtener los productos
    const obtenerProductos = () => {
        dispatch({
            type: OBTENER_PRODUCTOS_INICIO
        });

        //consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) //Traer solo los que esten existencia 
            .onSnapshot(manejarSnapshot);

            function manejarSnapshot(snapshot){
                let platillos = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                //ordener por categoria con lodash
                platillos = _.sortBy(platillos, 'categoria');
                
                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos
                })
            }
    }


    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos,
                cargando: state.cargando
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}


export default FirebaseState;