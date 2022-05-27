import React, { Component, useContext } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import { HomeScreens } from './systemScreen/HomeScreens'
import { NotificationScreen } from './systemScreen/NotificationScreen'
import  ListaNegocioScreen  from './systemScreen/ListaNegocioScreen'
import SettingScreen from './systemScreen/SettingScreen'
import { AuthContex } from '../context/UsuarioContext';


export default class PrincipalSellerScreens extends Component<{}, any>{

  static contextType = AuthContex
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 'HomeScreens',
      tabs: [
        {
          key: 'HomeScreens',
          icon: 'search',
          label: '',
          screen: <HomeScreens navigation={this.props.children} />,
          barColor: '#ffff',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },

        {
          key: 'NotificationScreen',
          icon: 'bell',
          label: '',
          screen: <NotificationScreen navigation={this.props.children} />,
          barColor: '#ffff',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'ListaNoegcios',
          icon: 'codesandbox',
          label: '',
          screen:<ListaNegocioScreen navigation={this.props.children} />,
          barColor: '#ffff',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },

        {
          key: 'SettingNotificacion',
          icon: 'settings',
          label: '',
          screen: <SettingScreen navigation={this.props.children} />,
          barColor: '#ffff',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },

      ],
    }

  }

 


  renderScreen = () => (
    this.state.activeTab == 'HomeScreens' && this.state.tabs[0].screen ||
    this.state.activeTab == 'NotificationScreen' && this.state.tabs[1].screen ||
    this.state.activeTab == 'ListaNoegcios' && this.state.tabs[2].screen ||
    this.state.tabs[3].screen

  )

  renderIcon = (icon: any) => ({ isActive }: any) => (
    <Icon size={25} color="#929392" name={icon} style={{ marginTop: 10 }} />
  )

  renderTab = ({ tab, isActive }: any) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
      style={{ backgroundColor: "black" }}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, }}>
          {this.renderScreen()}
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={(newTab: any) => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.state.tabs}
        />
      </View>
    )
  }
}

