import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import { Datum } from '../interfaces/SliderInterface';
import { useSlider } from '../hook/useSlider'

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
})

interface Props{
  data: Datum;
}

export const SliderSector = ({data}: Props) => {

  const { SliderActuales } = useSlider();
  const uriUno = data.url_imagen;
  console.log(SliderActuales[0].url_imagen)

    return (
        <View style={{height:190}}>
            <Swiper 
                style={styles.wrapper}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={5}
                showsPagination={false}
                >
                <View style={styles.slide1}>
                <Image 
                  source={{}}
                  style={{width:"100%",height:"100%",resizeMode:'cover'}} 
                />
                </View>
                <View style={styles.slide2}>
                <Image 
                  source={require('../sources/img/daule-2.jpg')}
                  style={{width:"100%",height:"100%",resizeMode:'cover'}} 
                />
                </View>
                <View style={styles.slide3}>
                <Image 
                  source={require('../sources/img/daule-3.jpg')}
                  style={{width:"100%",height:"100%",resizeMode:'cover'}} 
                />
                </View>
            </Swiper>
        </View>
    )
}

AppRegistry.registerComponent('myproject', () => SliderSector)