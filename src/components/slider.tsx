import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export const SwiperComponent = () => {

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
                <Text style={styles.text}>Imagen1</Text>
                </View>
                <View style={styles.slide2}>
                <Text style={styles.text}>Imagen2</Text>
                </View>
                <View style={styles.slide3}>
                <Text style={styles.text}>Imagen3</Text>
                </View>
            </Swiper>
        </View>
    )
}

AppRegistry.registerComponent('myproject', () => SwiperComponent)