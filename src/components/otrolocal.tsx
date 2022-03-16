import React, { Component } from 'react';
import { Alert, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';


class ExpandableListView extends Component {

  constructor() {
    super();
    this.state = {
      layoutHeight: 0
    }
  }

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => {
        return {
          layoutHeight: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          layoutHeight: 0
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  showSelectedCategory = (item) => {
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.panelContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.categoryView}>
          <Text style={styles.categoryText}>{this.props.item.category} </Text>
          <Image
            source={{ uri: 'https://i.postimg.cc/HLFkBBWk/arrow-right-icon.png' }}
            style={styles.iconStyle} />
        </TouchableOpacity>
        <View style={{ height: this.state.layoutHeight, overflow: 'hidden' }}>
          {
            this.props.item.subCategory.map((item, key) => (
              <TouchableOpacity key={key} style={styles.subCategoryText} onPress={this.showSelectedCategory.bind(this, item.name)}>
                <Text> {item.name} </Text>
                <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  }
}


export default class App extends Component {
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    // create array to contain Expandable ListView items & create a State named as accordionData and store the array in this State
    const array = [
      {
        expanded: false, category: "Mobiles", subCategory: [{ id: 1, name: 'Mi' }, { id: 2, name: 'RealMe' }, { id: 3, name: 'Samsung' },
        { id: 4, name: 'Infinix' }, { id: 5, name: 'Oppo' }, { id: 6, name: 'Apple' }, { id: 7, name: 'Honor' }]
      },
      {
        expanded: false, category: "Laptops", subCategory: [{ id: 8, name: 'Dell' }, { id: 9, name: 'MAC' }, { id: 10, name: 'HP' },
        { id: 11, name: 'ASUS' }]
      },
      {
        expanded: false, category: "Computer Accessories", subCategory: [{ id: 12, name: 'Pendrive' }, { id: 13, name: 'Bag' },
        { id: 14, name: 'Mouse' }, { id: 15, name: 'Keyboard' }]
      },
      {
        expanded: false, category: "Home Entertainment", subCategory: [{ id: 16, name: 'Home Audio Speakers' },
        { id: 17, name: 'Home Theatres' }, { id: 18, name: 'Bluetooth Speakers' }, { id: 19, name: 'DTH Set Top Box' }]
      },
      {
        expanded: false, category: "TVs by brand", subCategory: [{ id: 20, name: 'Mi' },
        { id: 21, name: 'Thomson' }, { id: 22, name: 'LG' }, { id: 23, name: 'SONY' }]
      },
      {
        expanded: false, category: "Kitchen Appliances", subCategory: [{ id: 24, name: 'Microwave Ovens' },
        { id: 25, name: 'Oven Toaster Grills (OTG)' }, { id: 26, name: 'Juicer/Mixer/Grinder' }, { id: 27, name: 'Electric Kettle' }]
      }
    ];
    this.state = { accordionData: [...array] }
  }

  // enable layout animation, toggle 'expanded' state for index and then update the layout
  updateLayout = (index:any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.accordionData];
    array[index]['expanded'] = !array[index]['expanded'];
    this.setState(() => {
      return {
        accordionData: array
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          {
            this.state.accordionData.map((item:any, key:any) =>
              (
                <ExpandableListView key={item.category} onClickFunction={this.updateLayout.bind(this, key)} item={item} />
              ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },
  iconStyle: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff'
  },
  subCategoryText: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },
  categoryText: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 21,
    padding: 10
  },
  categoryView: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0091EA'
  },
  Btn: {
    padding: 10,
    backgroundColor: '#FF6F00'
  }
});