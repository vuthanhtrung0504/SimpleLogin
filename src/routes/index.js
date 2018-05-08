import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Footer from '../components/Footer';
import Login from '../containers/Login';
import Home from '../containers/Home';
import Home1 from '../containers/Home.1';

export const LoginNavigator = StackNavigator(
  {
    login: { screen: Login }
  },
  {
    headerMode: 'none',
    initialRouteName: 'login',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      }
    })
  }
);

export const HomeNavigator = TabNavigator(
  {
    home: { screen: Home },
    home1: { screen: Home1 }
  },
  {
    headerMode: 'none',
    initialRouteName: 'home',
    tabBarComponent: props => <Footer {...props} />,
    tabBarPosition: 'bottom'
  }
);
