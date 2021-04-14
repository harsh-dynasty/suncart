import React from 'react'
import { StyleSheet, Text, View,Image ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase.js'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:this.props.route.params.email,
            isSeller:false,
            name:''
        }
    }
    async componentDidMount(){
        const name=await AsyncStorage.getItem('name')
        const email=await AsyncStorage.getItem('email')
       
            var docRef = db.collection("users").doc(email);
            var isSeller
            docRef.get().then((doc) => {
                this.setState({isSeller:doc.data()['isSeller'],name:name,email:email})
            })
        // if(isSeller=='yes')
            
        // else
        //     this.setState({isSeller:false,name:name})
    }
    async logout(){
        await AsyncStorage.removeItem('email')
        this.props.navigation.replace("Login",{email:this.state.email})
    }
    handleLogout(){
        Alert.alert(
            //title
            `Logout`,
            //body
            'Are you sure you want to logout?',
            [
            
              {
                text: 'Yes', onPress: () => this.logout()
              },
              {
                text: 'NO'
              },
            ],
            {cancelable: true},
          );
    }
    render(){
       
        return(
            
            <View style={styles.home}>
            <StatusBar backgroundColor='#FFF5E8' />
            <View style={styles.container} >
                <Image source={require("../assets/home/top.png")} style={styles.top}/>
             
                <View style={styles.header}>
                    <View style={[{...styles.row},{justifyContent:'space-between'}]}>
                        <Text style={styles.welcome}>Welcome</Text>
                        <TouchableOpacity onPress={()=>this.handleLogout()}>
                            <MaterialCommunityIcons name="logout" size={26} color="#4F1717" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{this.state.name}.</Text>
                </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("BrowseProducts")}>
                    <Image  style={styles.buttons} source={require("../assets/home/browse.png")}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Cart")}>
                    <Image  style={styles.buttons} source={require("../assets/home/cart.png")}/>
                 </TouchableOpacity>
            </View>
           
         <View style={styles.row}>
                {this.state.isSeller && (
                     <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddItem")}>
                     <Image  style={styles.buttons} source={require("../assets/home/addItem.png")}/>
                 </TouchableOpacity>
                )}
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Orders")}>
                    <Image  style={styles.buttons} source={require("../assets/home/orders.png")}/>
                 </TouchableOpacity>
         </View>
         
        
         {!this.state.isSeller &&(
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Seller",{email:this.state.email})}>
                    <Image  style={styles.buttons} source={require("../assets/home/seller.png")}/>
                </TouchableOpacity>
            </View>
         )}
               
         
      
     </View> 
     </View> 
   
    
        )
    }
}

const styles=StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
    container: {
        flex: 1,
       
        alignItems: 'center',
       paddingTop:260,
        width:"100%",
   
      },
      row:{
        position:'relative',
        bottom:20,
        flexDirection:'row',
        alignItems:'center'
      },
    top:{
        width:"100%",
        position:'absolute',
        top:0,
       
    },
    welcome:{
        
       fontSize:30,
       fontWeight:'bold',
       color:"#4F1717"
    },
    name:{
       
        fontSize:15,
       fontWeight:'bold',
       color:"#4F1717"
    },
    header:{
        position:'absolute',
        paddingHorizontal:30,
        
        top:50,
        // backgroundColor:'blue',
        width:"100%"
    }
   
})