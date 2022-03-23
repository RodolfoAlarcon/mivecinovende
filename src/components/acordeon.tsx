import React, {useEffect, useState} from "react";
import {
  SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity
} from 'react-native'

const CONTENT = [
  {
    isExpande : false,
    category_name: 'Item 1',
    subcategory: [
      {id: 1, val:'Sub 1'},
      {id: 2, val:'Sub 2'},
      {id: 3, val:'Sub 3'},
    ]
  },
  {
    isExpande : false,
    category_name: 'Item 2',
    subcategory: [
      {id: 4, val:'Sub 4'},
      {id: 5, val:'Sub 5'},
      {id: 6, val:'Sub 6'},
    ]
  },

];

const ExpandableComonent = () => {
  const [layoutHeight, setlayoutHeight] = useState(0);

  return(
    <View>
      <TouchableOpacity
        style={styles.item}
      >
        <Text style={styles.itemText}>

        </Text>
      </TouchableOpacity>
    </View>
  )
}

const Acordeon = () => {

  const [multiSelect, setmultiSelect] = useState(false);

  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            Expandible List View
          </Text>
          <TouchableOpacity
              onPress={
                () => setmultiSelect(!multiSelect)
              }
            >
              <Text style={styles.headerButton}>
                {
                  multiSelect
                  ? 'Enable Single \n Expand'
                  : 'Enable Multiple \n Expand' 
                }
              </Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
           {
             listDataSource.map((item:any, key:any) =>(
               <ExpandableComonent />
             ))
           }     
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1
  },
  header:{
    flexDirection: 'row',
    padding: 10
  },
  titleText:{
    flex:1,
    fontSize:22,
    fontWeight:'bold'
  },
  headerButton:{
    textAlign: 'center',
    justifyContent: 'center',
    fontSize:18,
  },
  item:{
    backgroundColor: 'orange',
    padding: 20,
  },
  itemText:{
    fontSize:16,
    fontWeight: '500',
  }
});

export default Acordeon;