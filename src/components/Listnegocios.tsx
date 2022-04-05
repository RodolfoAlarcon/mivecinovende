import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView, VirtualizedList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';



const navigator = useNavigation()

function goToScreen(routeName: any, id : any) {
    navigator.navigate(routeName as never, {id:id} as never);
}

export default class Listnegocios extends Component<{id:any},any>{


    constructor(props:any){
        super(props);
        this.state = {
            dataBanner:[]
        }
    }
    
    componentDidMount(){
  
        const url = `https://04.contenedoresnolvis.com/api/negocios/${this.props.id}`;
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {  
            if(typeof responseJson.data === 'object'){ 
                this.setState({
                    isLoading:false,
                    dataBanner: responseJson.data
                })
            }else{
                this.setState({
                    isLoading:false,
                    dataBanner: []
                })
            }    
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }

    render(){ 
        return(
            <FlatList  
                numColumns={1}
                data={this.state.dataBanner}
                renderItem={({item})=>this._renderItem(item)}                    
                keyExtractor ={(item:any,index)=>index.toString()}
                style={{width:'100%',paddingVertical:15}}
            />
        )
    }


    
    _renderItem(item:any){
        
        return(
            <View>
            <TouchableOpacity
                onPress={
                    () => {goToScreen('NegocioScreen', item.id)}
                }
            >
                    <View style={{flexDirection:'row',height:70,backgroundColor:'#e4e5e4',marginBottom:5,width:'100%',}}>
                        <View style={{width:'3%',backgroundColor:'#f979ae'}}>

                        </View>
                        <View style={{width:'70%',flexDirection:'row'}}>
                            <Image 
                                source={{uri:item.url_logo}}
                                style={{width:50,height:50,marginVertical:12,marginHorizontal:10,borderRadius: 50}} 
                            />
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={{width:'27%',flexDirection:'row'}}>
                            <Image 
                                source={require('../sources/img/delivery.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                            <Image 
                                source={require('../sources/img/llamar.png')}
                                style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginHorizontal:7}} 
                            />
                        </View>
                    </View>
            </TouchableOpacity>
            </View>

        )
    }
}
