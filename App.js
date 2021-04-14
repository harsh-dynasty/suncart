
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import SellerApply from './components/seller/applySeller'
import AddItem from './components/seller/addAnItem'
import RemoveItem from './components/seller/removeanItem'
import Cart from './components/cart/cart'
import SelectAdd from './components/cart/selectAdd'
import Orders from './components/orders/orders'
import OrderSummary from './components/orders/orderSummary'
import BrowseProducts from './components/browseProducts';
import ProductPage from './components/productPage'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import AddAddress from './components/cart/addAddress';

import AsyncStorage from '@react-native-async-storage/async-storage';


const config={ headerShown: false, gestureDirection:'horizontal',gestureEnabled:true, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}
const Stack = createStackNavigator();
export default class App extends React.Component {
      
   
     
      
    render(){
      
      return (
        
        <NavigationContainer>
          <Stack.Navigator  initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} initialParams={{ email: "" }} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} options={config}/>
          
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="BrowseProducts" component={BrowseProducts} options={config}/>
          <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="ProductPage" component={ProductPage} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="SelectAdd" component={SelectAdd} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="Seller" component={SellerApply} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }} options={config}/>
          <Stack.Screen name="RemoveItem" component={RemoveItem} options={{ headerShown: false }} options={config}/>
          
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
  
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
// });
