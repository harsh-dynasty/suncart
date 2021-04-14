import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView, Alert} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

import {db} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SelectAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cartAmt:this.props.route.params.cartAmt,
            cartQty:this.props.route.params.cartQty,
            selectedAddressId:null,
            addresses:[
                // {
                //     id:1,
                //     title:"Home",
                //     street:"dhanji bhai ka nohra",
                //     city:"Ratlam",
                //     state:"Madhya Pradesh",
                //     isSelected:true
                // },
                // {
                //     id:2,
                //     title:"Office",
                //     street:"Marine drive",
                //     city:"Mumbai",
                //     state:"Maharashtra",
                //     isSelected:false
                // },
               
            ]
        }
        this.changeAddress=this.changeAddress.bind(this)
        this.deleteAddress=this.deleteAddress.bind(this)
    }
    async deleteAddress(id){
        const email=await AsyncStorage.getItem('email')
        db.collection('users').doc(email).collection('addresses').doc(id).delete()
        this.setState({
            addresses:this.state.addresses.filter(address=>address.id!=id),
            selectedAddressId:(id==this.state.selectedAddressId)?null:this.state.selectedAddressId
        })
        // alert(this.state.selectedAddressId)
    }
    changeAddress(id){
        this.setState({
            selectedAddressId:id,
            addresses:this.state.addresses.map(address=>{
                if(address.id==id) address.isSelected=true
                else address.isSelected=false
                return address
            })
        })
    }
    longpress(title,id){
        Alert.alert(
            //title
            `Delete ${title} Address`,
            //body
            'Are you sure you want to delete this address?',
            [
            
              {
                text: 'Yes', onPress: () => this.deleteAddress(id)
              },
              {
                text: 'NO'
              },
            ],
            {cancelable: true},
          );
    }
    async placeOrder(){
        const email=await AsyncStorage.getItem('email')
        if(this.state.addresses.length!=0){
            if(this.state.selectedAddressId!=null){
                //place order here

                const docRef=db.collection('users').doc(email).collection('orders')
                docRef.add({
                    date:new Date,
                    addressId:this.state.selectedAddressId,
                    cartAmt:this.state.cartAmt,
                    cartQty:this.state.cartQty
                }).then(doc=>{
                   const orderId=doc.id
                   db.collection('users').doc(email).collection('cartItems').get()
                   .then(cartItems=>{
                       cartItems.forEach(cartItem=>{
                           const {category,qty}=cartItem.data()
                           docRef.doc(orderId).collection('orderItems').doc(cartItem.id).set({category,qty})
                       })
                   })
                })
                
                alert("Order successfully placed.")
                this.props.navigation.popToTop()
            }
            else{
               alert("Please select an address.")
            }
        }else{
            this.props.navigation.navigate("AddAddress",{cartAmt:this.state.cartAmt,cartQty:this.state.cartQty})
        }
        
    }
    async componentDidMount(){
        //get addresses from firebase and save them to states
        const email=await AsyncStorage.getItem("email")
        db.collection('users').doc(email).collection('addresses').get().then(addresses=>{
            addresses.forEach(address => {
                const {city,state,street,title}=address.data()
                this.setState({
                    addresses:[...this.state.addresses,{
                        id:address.id,
                        title,
                        street,
                        city,
                        state,
                        isSelected:false
                    }]
                })
            });
        })
    }
    render(){
       
        return(
   
    <View style={styles.home}>
    <StatusBar backgroundColor='#FFF5E8' />
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/cart/top.png")} style={styles.top}/>
        <Text style={styles.heading}>Select Address</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        {this.state.addresses.length==0?
        <Text style={styles.mssg}>No Address added</Text>:<Text style={styles.mssg}>Hold To delete an address</Text>
        }
       
        <ScrollView style={styles.scroll}>
        {
            this.state.addresses.map(({id,title,city,state,street,isSelected})=>(
                <TouchableOpacity style={styles.item} key={id} onPress={()=>this.changeAddress(id)} onLongPress={()=>this.longpress(title,id)}>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>{title}</Text>
                    <Text style={styles.itemSubHeading}>{street}</Text>
                    <Text style={styles.description}>{city}, {state}</Text>
                   
                </View>
                {isSelected?<Image source={require("../../assets/cart/placeholder.png")}/>:<Image source={require("../../assets/cart/blank.png")} />}
                
                
               
        </TouchableOpacity>
            ))
        }
       
        
           <View style={{width:200,alignSelf:'center',marginBottom:20}}>
        <Button title="Add a new address" color="#D2AC7A" onPress={()=>this.props.navigation.navigate("AddAddress")}/>
        </View>
        </ScrollView>
        <View style={styles.bottom}>
            <Image source={require("../../assets/cart/top.png")}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,position:'absolute',bottom:0,width:"90%"}}>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Summary</Text>
                    <Text>Total amount : ₹{this.state.cartAmt}</Text>
                    <Text>Total items : {this.state.cartQty}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.placeOrder()}>
                <Image source={require("../../assets/cart/placeorder.png")}/>
                </TouchableOpacity>
            </View>
        </View>
     </View> 
     </View>
    
        )
    }
}

const styles=StyleSheet.create({
    mssg:{
        fontSize:10,
        color:'grey'
    },
    homeBtn:{
        position:'absolute',
        top:30,
        right:50
    },

    home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
    container: {
        flex: 1,
        
        alignItems: 'center',
       paddingTop:100,
        width:"110%",
      },
    top:{
        width:"100%",
        position:'absolute',
        top:0
        
    },
    heading:{
        alignSelf:'flex-start',
        fontWeight:'bold',
        fontSize:25,
        width:"100%",
        position:'absolute',
        top:30,
        left:50
    },
    row:{
        position:'relative',
        top:40,
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    
    item:{
        position:'relative',
        left:-20,
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
        height:100,
        padding:15,
        justifyContent:'space-between',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:0.5,
        width:350,
        
        alignSelf:'center',
        marginBottom:12
    },
    image:{
        marginHorizontal:10
    },
    
    itemHeading:{
        fontWeight:'bold',
        fontSize:16
    },
    
    scroll:{
        // position:'relative',
        // top:60,
        // marginBottom:70
       marginTop:10
    },
   

})