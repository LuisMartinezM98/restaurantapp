import React, { Fragment, useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { useNavigation } from'@react-navigation/native';

import { StyledProvider, Box, Pressable, FlatList, HStack, VStack, Text, Avatar, AvatarImage, AvatarFallbackText } from '@gluestack-ui/themed'
import { config } from  '@gluestack-ui/config';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

  //Context de Firebase
  const { menu, obtenerProductos, cargando } = useContext(FirebaseContext);

  //Context de Pedido
  const{ seleccionarPlatillo } = useContext(PedidoContext);

  //Hook para redireccionar
  const navigation = useNavigation();

  const Separator = (categoria) => (
    [
      <Box style={styles.separador} key={categoria.index}>
        <Text style={styles.separadorText}>{categoria.categoria}</Text>
      </Box>
    ]
  )


  useEffect(() => {
      obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, index) => {

    if( index > 0){
        const categoriaAnterior = menu[index - 1].categoria;
      if(categoriaAnterior !== categoria){
        return(
          <Separator categoria={categoria} index={index}/>
        )
      }
    }else{
      return(
        <Separator categoria={categoria} index={index}/>
      )
    }
  }

  return (
    <StyledProvider config={config}>
        <Box style={globalStyles.contenedor}>
         { cargando ? (
          <Text> Cagando...</Text>
         ) : (
          <FlatList
          data={menu}
          renderItem= {({item, index}) => (
              <Fragment>
                {mostrarHeading(item.categoria, index)}
              <Pressable key={item.id} style={{borderBottomWidth: 1, borderColor: 'gray'}} onPress={() => {

                //Eliminar algunas propiedades del platillo
                // const { existencia, ...platillo2} = item;

                seleccionarPlatillo(item);
                navigation.navigate('DetallePlatillo')
              }}>
                <HStack style={{ marginLeft: 10, padding: 15}}>
                <Avatar size='md' style={{marginRight: 10}}>
                      <AvatarImage source={{ uri: item.imagen }} alt={item.descripcion}/>
                </Avatar>
                  <VStack>
                    <Text>{item.nombre}</Text>
                    <Text
                      style={{ color: 'gray'}}
                      numberOfLines={3}
                      note
                    >{item.descripcion}</Text>
                    <Text>Precio: ${item.precio}</Text>
                  </VStack>
                </HStack>
              </Pressable>
              </Fragment>
            )
          }
          >
          </FlatList>
         )}
        </Box>
    </StyledProvider>
  )
}

const styles = StyleSheet.create({
  separador: {
    backgroundColor: '#000',
    padding: 10
  },
  separadorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})


export default Menu
