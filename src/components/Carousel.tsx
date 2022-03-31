import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { Datum } from '../interfaces/categoriaInterface';

export default class Carousel extends Component<{},any>{
    constructor(props:any){
        super(props);
        this.state = {
            dataBanner:[]
        }
    }
    
    componentDidMount(){
        const url = 'https://04.contenedoresnolvis.com/api/galeria-de-imagenes-de-sector/95df9f72-2ab4-4d3c-a5ef-7105dec742e0';
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson)=> {
            let newArray:any = [];
            responseJson.data.map((n:any) => (
                
                newArray.push(n.url_imagen)

            ))

            
            this.setState({
                isLoading:false,
                dataBanner: newArray
            })
        })
        .catch((error:any)=> {
            console.log(error)
        })
    }


    render(){
        return(
                <Swiper
                    showsPagination={false}
                    autoplay={true}
                    loop={true}
                    autoplayTimeout={0.5}
                >
                    {
                        this.state.dataBanner.map((itemmap:any)=>{
                            return(
                                <Image
                                    style={{width:"100%",height:200}}
                                    source={{uri: itemmap}}
                                />
                            )
                        })
                    }
                </Swiper>
        )
    }
}