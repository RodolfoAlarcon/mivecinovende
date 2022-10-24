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

    <View>
      {props.notifications.map((n: any) => (


        <TouchableOpacity 
          key={n.id} 
          onPress={() => goToScreen('NotificationDetailScreen', n.content, n.type)}
          style={{flexDirection:"row",width:"100%"}}  
        >
            <View style={{width:"20%", justifyContent:"center"}}>
              <View style={{width:55,height:55, justifyContent:"center", alignItems:"center",borderRadius:50, borderWidth:2, borderColor:"#453091", overflow:'hidden'}}>
              <Image
                source={(n.content.url_imagen == null || n.content.url_imagen == '') ? require('../sources/img/url_default.png') : { uri: n.content.url_imagen }}
                style={{width:45,height:45, resizeMode:'cover', borderRadius:50}}
              />
              </View>
            </View>
            <View style={{width:"80%"}}>
              <Text numberOfLines={1} style={{ fontSize: 18, color: "#453091",fontWeight:"900" }}>{n.content.titulo}</Text>
              <Text numberOfLines={1} style={{ color: n.status == 0 ? '#9175DC' : '#453091' }}>{n.content.mensaje}</Text>
              <View style={{ flexDirection: 'row' }}>
                
                <Icon size={10} color="black" name={"clock"} />
                <Text style={{ fontSize: 10, marginLeft: 5, color: "black" }}>{n.created_at}</Text>
              </View>

            </View>
        </TouchableOpacity>
      ))}
    </View>

  );
  function goToScreen(routeName: any, data: any, type: any) {
    navigator.navigate(routeName as never, { data: data, type: type } as never);
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

