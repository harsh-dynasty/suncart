import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import {db} from '../../firebase'

import { StatusBar } from 'expo-status-bar';
export default class SellerApply extends React.Component{
  constructor(props){
    super(props)
    this.state={
        companyName:"",
        phone:'',
        email:this.props.route.params.email,
        address:'',
        city:''
    }
}
componentDidMount(){
  
}

apply(){
  const {companyName,phone,email,address,city}=this.state
  if(companyName.length!=0 && phone.length!=0 && email.length!=0 && address.length!=0 && city.length!=0){
    db.collection("applications").doc(email).set({
      phone,address,city,companyName
    });
    this.props.navigation.goBack()
    Alert.alert(
      `Thank you for applying for seller's account.`,
      "We'll review your application shortly.",
    );
  }else{
    alert("Please fill all fields.")
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
            {/* <View style={styles.container} > */}
               
               
          <Image source={require("../../assets/login/top.png")} style={styles.top}/>
          
       
      <View style={styles.header}>
        <Text style={styles.heading}>Become a seller</Text>
        <Text style={styles.subheading}>Apply for seller's account.</Text>
      </View>
     
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Company name" onChangeText={txt=>this.setState({companyName:txt})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Phone no." onChangeText={txt=>this.setState({phone:txt})}/>
      </View>
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Email Address" onChangeText={txt=>this.setState({email:txt})} value={this.state.email}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Office Address" onChangeText={txt=>this.setState({address:txt})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="City" onChangeText={txt=>this.setState({city:txt})}/>
      </View>
      
         <TouchableOpacity style={styles.continue} onPress={()=>this.apply()}>
           <Image  style={styles.continuebtn} source={require("../../assets/login/continue.png")}/>
         </TouchableOpacity>
      
      
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
    // position:'relative',
    // top:top
  },

    container: {
        flex: 1,
        alignItems: 'center',
       paddingTop:230,
       paddingBottom:470,
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

        width:"100%",
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
      
        width:"80%",
        marginTop:8,
        height:50
    },
    input:{
        fontSize:14,
        backgroundColor:'#FFFEF0',
        height:"100%",
        padding:15,
        borderRadius:50
    },
    
    continue:{
        position:'absolute',
        right:20,
        bottom:50,
        
    },
    continuebtn:{
        
        width:90,
        height:90
    }

})