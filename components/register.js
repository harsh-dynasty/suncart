import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import {db} from '../firebase.js'
export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:"",
            phone:"",
            email:"",
            password:"",
        }
       
    }
    register(){
        const {name,email,password,phone}=this.state
        if(name.length!=0 && email.length!=0 && password.length!=0 && phone.length!=0){
            var docRef = db.collection("users").doc(email);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    alert("User already registered")
                } else {
                    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                    
                    if(regex.test(password)){
                        db.collection("users").doc(email).set({
                            name: name, 
                            phone: phone,
                            password:password
                          });
                          alert("Please login to continue")
                          this.props.navigation.popToTop()
                    }else{
                        alert("Password length must be 8 or more characters long.\nPassword must contain atleast one lower case, upper case letter and a special symbol.");
                    }
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }else{
            alert("Fill all fields.")
        }

       
    }
    render(){
        return(
    //         <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
    <View style={styles.home}>
    <StatusBar backgroundColor='#FFF5E8' />
            {/* <View style={styles.container} > */}
               
            <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
     
    >
          <Image source={require("../assets/login/top.png")} style={styles.top}/>
          
       
      <View style={styles.header}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.subheading}>Please register here to continue..</Text>
      </View>
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Full name" onChangeText={text=>this.setState({name:text})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Phone no." onChangeText={text=>this.setState({phone:text})} keyboardType='numeric'/>
      </View>
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Email Address" onChangeText={text=>this.setState({email:text})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Choose a Password" onChangeText={text=>this.setState({password:text})} secureTextEntry/>
      </View>
      
         <TouchableOpacity style={styles.continue} onPress={()=>this.register()}>
           <Image  style={styles.continuebtn} source={require("../assets/login/continue.png")}/>
         </TouchableOpacity>
      <TouchableOpacity style={styles.extrabtn} onPress={()=>this.props.navigation.popToTop()}>
      <Image style={styles.downbtn} source={require("../assets/login/login.png")}/>
      </TouchableOpacity>
      <Image style={styles.bottom} source={require("../assets/login/bottom.png")}/>
      
     {/* </View>  */}
     </KeyboardAvoidingView>
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
    paddingBottom:450,
    alignItems: 'center',
   paddingTop:200,
    width:"100%",
  },
    top:{
        width:"100%",
        position:'absolute',
        top:-70
        
    },
    header:{
        position:'absolute',
        top:160,
        alignSelf:'flex-start',
        marginLeft:30,
        marginBottom:15
    },
    heading:{
        fontWeight:'bold',
        fontSize:30,
        // marginBottom:15
    },
    subheading:{
        fontSize:15,
        color:"#656464"
    },
    inputOut:{
        position:'relative',
        top:40,
        width:"80%",
        marginBottom:15,
        height:50
    },
    input:{
        fontSize:14,
        backgroundColor:'#FFFEF0',
        height:"100%",
        padding:15,
        borderRadius:50
    },
    bottom:{
        position:'absolute',
        bottom:-150,
        zIndex:1
    },
    extrabtn:{
        position:'absolute',
        bottom:3,
        zIndex:2,
       
    },
    downbtn:{
        width:150,
        height:70
    },
    continue:{
        position:'absolute',
        right:20,
        bottom:70,
        
    },
    continuebtn:{
        
        width:90,
        height:90
    }

})