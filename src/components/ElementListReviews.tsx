import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native'
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { color } from '../styles/colors'


const ElementListReviews = (props: any) => {

  const [isView, setIsView] = useState(false);
  const toggleSwitch = () => setIsView(previousState => !previousState);
  const navigator = useNavigation()


  return (

    <View>
      {props.reviewsBusiness.map((n: any) => (


        <View 
          key={n.id}
          style={{flexDirection:"row",width:"100%", marginBottom:10}}  
        >
            <View style={{width:"20%", justifyContent:"center"}}>
              <View style={{width:55,height:55, justifyContent:"center", alignItems:"center",borderRadius:50, borderWidth:2, borderColor:"#453091", overflow:'hidden'}}>
              <Image
                source={(n.url_imagen == null || n.url_imagen == '') ? require('../sources/img/url_default.png') : { uri: n.url_imagen }}
                style={{width:45,height:45, resizeMode:'cover', borderRadius:50}}
              />
              </View>
            </View>
            <View style={{width:"80%"}}>
              <View style={{flexDirection:'row'}}>
              <Text numberOfLines={1} style={{ fontSize: 18, color: "#453091",fontWeight:"900" }}>{n.name}</Text>
              <Text numberOfLines={1} style={{ marginLeft:10, color: '#453091', fontSize: 16}}><Icon style={{ marginLeft: 7, marginTop: 3 }} name='star' size={12} color='#453091' /> {n.puntuacion}</Text>
              </View>
              
              <Text numberOfLines={1} style={{ color: '#453091' }}>{n.descripcion}</Text>
              <View style={{ flexDirection: 'row' }}>
                
                <Icon size={10} color="black" name={"clock"} />
                <Text style={{ fontSize: 10, marginLeft: 5, color: "black" }}>{n.updated_at}</Text>
              </View>

            </View>
        </View>
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


export default ElementListReviews;

