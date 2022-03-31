import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

export default class Subcategocaja extends Component<{},any>{

    constructor(props:any){
        super(props);
        this.state = {
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const url = 'https://04.contenedoresnolvis.com/api/categorias';
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

    _renderItem(item:any){ 
        return(
            <TouchableOpacity>
                <View style={{flexDirection:'row',height:70,backgroundColor:'#fed1e5',marginBottom:5}}>
                    <View style={{width:'3%',backgroundColor:'#f979ae'}}></View>
                    <View style={{width:'77%',flexDirection:'row'}}>
                        <Image 
                            source={require('../sources/img/ICONOS-06.png')}
                            style={{width:50,height:40,resizeMode:'contain',marginVertical:12,marginHorizontal:10}} 
                        />
                        <Text style={{color:'#000',fontWeight:'bold',fontSize:16,marginVertical:26}}>
                            01.01 ALMUERZO
                        </Text>
                    </View>
                    <View style={{width:'25%',flexDirection:'row'}}>
                        <Image 
                            source={require('../sources/img/ojo.png')}
                            style={{width:30,height:30,resizeMode:'contain',marginVertical:23,marginRight:7}} 
                        />
                        <Text style={{color:'#000',fontWeight:'bold',fontSize:15,marginVertical:27}}>
                            1
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
