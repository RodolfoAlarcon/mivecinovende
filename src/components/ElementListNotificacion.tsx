import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native'
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { color } from '../styles/colors'


const ElementListNotificacion = (props: any) => {

  const [isView, setIsView] = useState(false);
  const toggleSwitch = () => setIsView(previousState => !previousState);
  const navigator = useNavigation()

 
  return (

    <DataTable>
      {props.notifications.map((n: any) => (


        <TouchableOpacity key={n.id} onPress={() => goToScreen('NotificationDetailScreen', n.content)}>
          <DataTable.Row style={{ height: 70, padding: 10, borderColor: "#0000", borderRadius: 20 }}>

            <DataTable.Cell style={{ flex: 0.3 }}>

              <View>
                <Image source={
                  //isView = n.type 
                  (n.type == 'TOQUE')?
                    (n.status == 0)?
                      require('../sources/img/closed_eye.png') :
                      require('../sources/img/open_eye.png') :
                  (n.type == 'PUBLICIDAD')?
                    (n.status == 0) ?
                        require('../sources/img/closed_eye.png') :
                        require('../sources/img/open_eye.png')
                  :
                    require('../sources/img/interrogation.png')
                
                      
                }
                  style={{ height: 25, width: 25 }} />
              </View>
            </DataTable.Cell>

            <DataTable.Cell style={{ flex: 2 }}>
              <View>
                <Text style={{ fontSize: 20 }}>Toque de {n.content.nombre}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon size={15} color="black" name={"clock"} />
                  <Text style={{ fontSize: 13, marginLeft: 5 }}>{n.created_at}</Text>
                </View>

              </View>

            </DataTable.Cell>

            <DataTable.Cell style={{ flex: 0.3 }}>
              <View>
                <Icon size={22} color={props.colorIcon} name={"star"} />
              </View>
            </DataTable.Cell>

          </DataTable.Row>
        </TouchableOpacity>
      ))}
    </DataTable>

  );
  function goToScreen(routeName: any, data:any) {
    navigator.navigate(routeName as never, {data:data} as never);
}
};
const styles = StyleSheet.create({
  container: {
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

  },
  buttons: {
    alignItems: "center",
    backgroundColor: "#C9C3C3",
    padding: 5,
    borderRadius: 10
  }

});


export default ElementListNotificacion;

