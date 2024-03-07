import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Button, Box, ButtonText} from '@gluestack-ui/themed'

import globalStyles from '../styles/global'
import { useNavigation } from'@react-navigation/native'

const NuevaOrden = () => {

  const navigation = useNavigation();

  return (
      <>
        <Box style={globalStyles.contenedor}>
          <View style={[globalStyles.contenido, styles.contenido]}>
            <Button variant="link" style={globalStyles.boton}
              onPress={ () => navigation.navigate('Menu')}
            >
              <ButtonText style={globalStyles.botonTexto}> Crear Nueva Orden</ButtonText>
            </Button>
          </View>
        </Box>
      </>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
})


export default NuevaOrden
