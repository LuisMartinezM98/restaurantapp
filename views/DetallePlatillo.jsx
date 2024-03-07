import React, { useContext } from 'react'
import { StyledProvider, Heading, Box, Card, Image, Text, PopoverFooter, PopoverContent } from '@gluestack-ui/themed'

import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {

  //Pedido context
  const { platillo } = useContext(PedidoContext);
  const { nombre, imagen, descripcion, precio } = platillo;
  return (
    <StyledProvider>
      <Box style={globalStyles.contenedor}>
        <Box style={globalStyles.contenido}>
          <Heading style={globalStyles.titulo}>{nombre}</Heading>
          <Card style={{padding: 20, borderRadius: 32, maxWidth: 360, borderWidth: 2, shadowOpacity: 10,backgroundColor: '#fafafa', borderColor: '#404040'}}>
            <Box>
              <Image style={globalStyles.imagen} source={{ uri: imagen}} alt={descripcion}/>
              <Text style={{ marginTop: 20}}>{descripcion}</Text>
              <Text style={globalStyles.cantidad}>Precio: ${precio}</Text>
            </Box>
          </Card>
        </Box>

        <Box
        position='fixed'
        bottom={30}
        left={0}
        right={0}
        padding={3}
        justifyContent='center'
        alignItems='center'
        >
          <Text>Este es el pie de pagina</Text>
        </Box>

      </Box>
    </StyledProvider>
  )
}

export default DetallePlatillo
