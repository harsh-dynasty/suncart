import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, Alert, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import {db} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';
import { FileSystem } from 'react-native-unimodules';
let imageDimensions={
  height:200,
  width:200
}
export default class AddItem extends React.Component{
  constructor(props){
    super(props)
    this.state={
        itemName:"",
        itemTitle:"",
        itemDescription:"",
        image:null,
        price:0,
        category:'smartphones'
        
    }
  
  }
  async pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(result);
    
    
  //   ImgToBase64.getBase64String(result.uri)
  // .then(base64String => console.log(base64String))
 
    if (!result.cancelled) {
      FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
    .then(res=>{
      const uri=`data:image/png;base64,${res}`;
      this.setState({image:uri});
    })
      // this.setState({image:result.uri});
      imageDimensions.height=result.height
      imageDimensions.width=result.width
    }
  };
  async addItem(){
    const email=await AsyncStorage.getItem('email')

    const {itemName,itemTitle,itemDescription,price,image,category}=this.state

    if(itemName.length!=0 && itemTitle.length!=0 && itemDescription.length!=0 && price.length!=0 && image.length!=0){
          db.collection(category).add({
            itemName,itemTitle,itemDescription,price,image,email
          });
    }else{
      alert("Please select all fields.")
    }
    this.props.navigation.goBack()
    Alert.alert(
      "Success",
      `New item uploaded.`
    );
  }
    render(){
        return(
    //         <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
            
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/seller/top2.png")} style={styles.top}/>
          
       
    
        <Text style={styles.heading}>Add an Item</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scroll} bounces style={{width:"100%"}} keyboardShouldPersistTaps="always">
        <View  style={styles.inputOut}>
     
     <Picker
       style={{backgroundColor:'#FFFEF0'}}
       selectedValue={this.state.category}
       onValueChange={(itemValue, itemIndex) =>
         this.setState({category:itemValue})
       }>
       <Picker.Item label="Computers and laptops" value="computers" />
       <Picker.Item label="Smartphones" value="smartphones" />
       <Picker.Item label="Accessories" value="accessories" />
     </Picker>
 </View>
      <View style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Item name" onChangeText={txt=>this.setState({itemName:txt})}/>
      </View>
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Item Title" onChangeText={txt=>this.setState({itemTitle:txt})}/>
      </View>
      <View style={[{...styles.inputOut},{height:200}]} >
        <TextInput style={[{...styles.input},{height:200}]} onChangeText={txt=>this.setState({itemDescription:txt})} placeholder="Item description" multiline numberOfLines={20} textAlignVertical="top"/>
        
    
      </View>
     
      
      <View  style={styles.inputOut}>
        <TextInput style={styles.input} placeholder="Item Price" onChangeText={txt=>this.setState({price:txt})} keyboardType="numeric"/>
      </View>
     <View >
      <Button title="Upload an Image" onPress={()=>this.pickImage()}/>
      {this.state.image && <Image source={{ uri: this.state.image }} style={styles.upload} />}
      </View>
      </ScrollView>
         <TouchableOpacity style={styles.continue} onPress={()=>this.addItem()}>
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
    upload:{ 
      width: imageDimensions.width, 
      height: imageDimensions.height ,
      borderRadius:15,
      marginVertical:20
    },
    scroll:{
      backgroundColor:'white',
      alignItems:'center'
    },
    

})