import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView } from 'react-native'
import { DataTable, List } from 'react-native-paper'; //===================================LIBRERIA
import Icon from 'react-native-vector-icons/dist/Feather';


const ElementListVecino = (props) => {


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [controlledValue, setControlledValue] = useState(false);

  return (

//================================================================LA TABLA Q CON EL MAP RECORRE LO NECESARIO A USAR

    <DataTable>
      {props.grupos.map(n => (
        <TouchableOpacity key={n.id} onPress={() => goToScreen('VecinosGrupoScreen', n.integrantes)}>

          <DataTable.Row style={{ height: 70, padding: 10 }}>

            <DataTable.Cell style={{ flex: 0.3 }}>
              <View>
                <Icon size={20} color="grey" name={"users"} />
              </View>

            </DataTable.Cell>

            <DataTable.Cell style={{ flex: 3 }}>

              <Text style={{ fontSize: 15 }}>    {n.nombre}</Text>

            </DataTable.Cell>

            <DataTable.Cell style={{ flex: 0.3 }}>
              <View>
                <Image source={require('../sources/img/next.png')} style={{ height: 15, width: 15 }} />
              </View>

            </DataTable.Cell>

          </DataTable.Row>
        </TouchableOpacity>
      ))}
    </DataTable>


  );
  function goToScreen(routeName, integrantes2) {
    props.navigation.navigate(routeName, { integrantes: integrantes2 })
  }
//=============================LA FUNCION DE CADA UNA CON EL TOUCH
};

//=========================LOS ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  }, containerTable: {
    marginTop: "5%",
    flexDirection: 'row',
    marginLeft: '-5%',
    alignItems: "center",
    justifyContent: "center"
  },
  touch: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  buttons: {
    alignItems: "center",
    backgroundColor: "#C9C3C3",
    padding: 5,
    borderRadius: 10
  }, CollapsibleViewStyle: {
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
  }, CollapsibleTitle: {
    backgroundColor: "red",
    marginLeft: "1%",
    fontSize: 23,
    borderRadius: 5,
    color: "white",
    width: "100%",
    padding: 20,
    shadowColor: "black",
  }

});

/*
<List.Section>
      {props.grupos.map(n => (
        <List.Accordion
          key={n.id}
          title={n.nombre}>
             <DataTable>
                {n.integrantes.map(i => (
                  <DataTable.Row key={i.id} style={{ height: 70, padding: 10 }}>
                    <DataTable.Cell style={{ flex: 3 }}><Text style={{ fontSize: 15}}>    {i.name}</Text></DataTable.Cell>

                    <DataTable.Cell style={{ flex: 1.5 }}>

                      <View style={styles.touch}>

                        <TouchableOpacity style={styles.buttons}>
                          <Image source={require('@sources/img/eye.png')}
                            style={{ height: 25, width: 25 }}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.touch}>
                        <TouchableOpacity style={styles.buttons}>

                          <Image source={require('@sources/img/danger.png')}
                            style={{ height: 25, width: 25 }}
                          />

                        </TouchableOpacity>
                      </View>
                    </DataTable.Cell>

                  </DataTable.Row>
                ))}
              </DataTable>
        </List.Accordion>
       ))}

    </List.Section>
*/




export default ElementListVecino;

