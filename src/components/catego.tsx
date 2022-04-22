import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ActivityIndicator,Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const navigator = useNavigation()

function goToScreen(routeName: any, id : any, name: string) {
    navigator.navigate(routeName as never, {id:id, name:name} as never,);
}

export default class Categoria extends Component<{},any>{

    constructor(props:any){
        super(props);
        this.state = {
            isLoading:true,
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const url = 'https://04.contenedoresnolvis.com/api/categorias/95e7e977-fdb7-424c-bcfe-5fd9db8441d8';
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {       
            this.setState({
                isLoading:false,
                dataBanner: responseJson.data
            })
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }


    render(){
        let ScreenHeight = Dimensions.get("window").height;
        if (this.state.isLoading) {
            return(
                <View 
                    style={{
                        justifyContent:"center",
                        alignItems:"center",
                        height: ScreenHeight,
                        width:"100%",
                        marginTop: -353,
                        backgroundColor:"white"
                    }}
                >
                    <Image
                        source={require('../sources/img/icono.png')}
                    />
                </View>
            )
        }else{
            return(
                <View>
                    <FlatList
                        numColumns={2}
                        data={this.state.dataBanner}
                        renderItem={({item})=>this._renderItem(item)}
                        keyExtractor ={(item:any,index)=>index.toString()}
                        style={{width:'100%',paddingVertical:15}}
                    />
                </View>
            )
        }
    }

    _renderItem(item:any){ 
        return(
            <TouchableOpacity 
            onPress={
                () => {goToScreen('SubcategoriasScreen', item.id, item.name)}
            }
                style={styles.botoncaja} 
            >
            <View style={styles.contenidoboton}>
                <Image 
                source={{uri:item.url_imagen}}
                    style={{width:60,height:50,resizeMode:'contain'}} 
                />
            </View>
            <View style={styles.contenidobotontext}>
              <Text style={styles.textboton}>
                  {item.name}
                </Text>
            </View>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    banner:{
        height:50,
        backgroundColor: '#007ba4',
    },
    textbanner:{
        color:'#ffffff',
        fontSize:17, 
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:13
    },
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    buscador:{
        height:60,
        backgroundColor:'#dfa71b',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    botoncaja:{
        width:'47.5%',
        height:100,
        marginVertical:7,
        marginHorizontal:5,
        flexDirection:'row',
        padding:10,
        backgroundColor: '#007ba4',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    contenidoboton:{
        width:'35%',
        justifyContent:'center',
        alignItems: 'center'
    },
    contenidobotontext:{
        width:'65%',
        justifyContent:'center',
        alignItems:'center'
    },
    textboton:{
        fontSize:17,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
    }
  });