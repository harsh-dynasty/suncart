import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

import {db} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddAddress extends React.Component{
  constructor(props){
    super(props)
    this.state={
      cartAmt:this.props.route.params.cartAmt,
      cartQty:this.props.route.params.cartQty,
        title:"",
        city:"",
        street:"",
        state:"",
        
    }
  
  }
  async addAddress(){
        var {title,street,city,state}=this.state
        //add new address to firebase
        const email=await AsyncStorage.getItem("email")
        db.collection("users").doc(email).collection('addresses').add({
          title,street,city,state
        })
        this.props.navigation.pop()
        // this.props.navigation.replace("SelectAdd",{newAddress:this.state})
        this.props.navigation.replace("SelectAdd",{cartAmt:this.state.cartAmt,cartQty:this.state.cartQty})

  }
 
    render(){
        return(
    //         <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
            
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/seller/top2.png")} style={styles.top}/>
          
       
    
        <Text style={styles.heading}>Add an Address</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scroll} bounces style={{width:"100%"}}>
         
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Title" onChangeText={txt=>this.setState({title:txt})}/>
      </View>
     
      <View style={[{...styles.inputOut},{height:150}]} >
        <TextInput style={[{...styles.input},{height:150}]} onChangeText={txt=>this.setState({street:txt})} placeholder="Street" multiline numberOfLines={10} textAlignVertical="top"/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="City" onChangeText={txt=>this.setState({city:txt})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="State" onChangeText={txt=>this.setState({state:txt})}/>
      </View>
     
      </ScrollView>
         <TouchableOpacity style={styles.continue} onPress={()=>this.addAddress()}>
           <Image  style={styles.continuebtn} source={require("../../assets/login/continue.png")}/>
         </TouchableOpacity>
      
     </View> 
    
    
        )
    }
}

const styles=StyleSheet.create({
  homeBtn:{
    position:'absolute',
    top:40,
    right:50
},

    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
       paddingTop:100,
        width:"100%",
      },
    top:{
        width:"100%",
        position:'absolute',
        top:0
        
    },
    heading:{
        alignSelf:'flex-start',
       
        fontSize:25,
        position:'absolute',
        top:30,
        left:30
    },
    
    inputOut:{
        width:"80%",
        marginBottom:15,
        height:50,
        
    },
    input:{
        fontSize:14,
        backgroundColor:'#FFFEF0',
        height:"100%",
        padding:15,
        borderRadius:12,
        borderWidth:0.3
    },
    
    continue:{
        position:'absolute',
        right:20,
        bottom:20,
        
    },
    continuebtn:{
        
        width:90,
        height:90
    },
  
    scroll:{
      backgroundColor:'white',
      alignItems:'center'
    },
    

})