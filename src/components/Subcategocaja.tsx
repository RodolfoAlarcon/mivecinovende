import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ActivityIndicator, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const navigator = useNavigation()

function goToScreen(routeName: any, id : any, name: any) {
    navigator.navigate(routeName as never, {id:id , name:name} as never);
}


export default class Subcategocaja extends Component<{id:any},any>{

    constructor(props:any){
        super(props);
        this.state = {
            isLoading:true,
            dataBanner:[]
        }
    }
    
    componentDidMount(){

        const url = `https://04.contenedoresnolvis.com/api/subcategorias/${this.props.id}`;
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
                        marginTop: -210,
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
            <View>
                            <TouchableOpacity
            onPress={
                () => {goToScreen('ListNegocioScreens', item.id, item.name)}
            }
            style={{
                marginHorizontal:5
            }}
            >
                <View
                    style={styles.botton}
                >
                    <View style={{width:'3%',backgroundColor:'#dfa71b'}}></View>
                    <View style={{width:'75%',flexDirection:'row'}}>
                        <Image 
                            source={require('../sources/img/ICONOS-06.png')}
                            style={{width:50,height:40,resizeMode:'contain',marginVertical:12,marginHorizontal:10}} 
                        />
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{width:'20%',flexDirection:'row',justifyContent:'flex-end',marginRight:'2%'}}>
                        <Image 
                            source={require('../sources/img/ojo.png')}
                            style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginRight:7}} 
                        />
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:15,marginVertical:27,textAlign:'center'}}>
                            1
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    botton:{
        flexDirection:'row',
        height:70,
        backgroundColor:'#007ba4',
        marginBottom:5,
        width:'100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
})