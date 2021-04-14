import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../firebase.js'
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:this.props.route.params.email,
            password:""       
        }
    }
    async getData(){

        const value = await AsyncStorage.getItem('email')
        if(value !== null) {
          this.props.navigation.replace("Home",{email:value})
        }
      
    }
    componentDidMount(){
      this.getData()
    }
    async goTOHome(email,name){
       
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('name', name)
        
        this.props.navigation.replace("Home",{email:email})
    }
    login(){
        const {email,password}=this.state
        if(email.length!=0 && password.length!=0){
            var docRef = db.collection("users").doc(email);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    if(doc.data()['password']==password){
                        
                        this.goTOHome(email,doc.data()['name'])
                    }
                    else
                        alert("Incorrect password")
                } else {
                    alert("User not exist");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }else{
            alert("All fields are required")
        }
        
        
       
      }
    
    render(){

        return(
   
    <View style={styles.home}>
    <StatusBar backgroundColor='#FFF5E8' />

           
            <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
     
    >
               
          <Image source={require("../assets/login/top.png")} style={styles.top}/>
          
       
      <View style={styles.header}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subheading}>Please sign-in to continue..</Text>
      </View>
      
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Email Address" value={this.state.email} onChangeText={txt=>this.setState({email:txt})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Password" onChangeText={txt=>this.setState({password:txt})} secureTextEntry/>
      </View>
      
         <TouchableOpacity style={styles.continue} onPress={()=>this.login()}>
           <Image  style={styles.continuebtn} source={require("../assets/login/continue.png")}/>
         </TouchableOpacity>
      <TouchableOpacity style={styles.extrabtn} onPress={()=>this.props.navigation.navigate("Register")}>
      <Image style={styles.downbtn} source={require("../assets/login/register.png")}/>
      </TouchableOpacity>
      <Image style={styles.bottom} source={require("../assets/login/bottom.png")}/>
      
     {/* </View>  */}
     </KeyboardAvoidingView>
     </View>
    //  </KeyboardAvoidingView>
    
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
        // position:'absolute',
        // top:0
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
        marginBottom:15
    },
    subheading:{
        fontSize:15,
        color:"#656464"
    },
    inputOut:{
        position:'relative',
        top:40,
        width:"80%",
        marginTop:15,
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
        bottom:80,
        
    },
    continuebtn:{
        
        width:90,
        height:90
    }

})