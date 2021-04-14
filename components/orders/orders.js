import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../firebase'
export default class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state={
            orders:[
                // {
                //     date:"12 March 2021",
                //     amt:45000,
                //     qty:12,
                //     id:687878
                // }
            ]
        }
    }
    async componentDidMount(){
            const email=await AsyncStorage.getItem("email")
            const ref=db.collection('users').doc(email).collection('orders')
            ref.get().then(orders=>{
                orders.forEach(order=>{
                    var {cartAmt,cartQty,date}=order.data()
                    date=date.toDate().toString().slice(4,16)
                    this.setState({
                        orders:[...this.state.orders,{
                            date,amt:cartAmt,qty:cartQty,id:order.id
                        }]
                    })
                    // console.log(order.data())
                })
            })
    }
    render(){
        return(
   
    <View style={styles.home}>
    <StatusBar backgroundColor='#FFF5E8' />
            
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/cart/top.png")} style={styles.top}/>
        <Text style={styles.heading}>Orders</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView style={styles.scroll}>
        {   this.state.orders.length==0?(<Text>No orders available.</Text>):
            this.state.orders.map(order=>(
                <TouchableOpacity style={styles.item} key={order.id} onPress={()=>this.props.navigation.navigate("OrderSummary",{id:order.id,amt:order.amt,date:order.date,qty:order.qty})}>
                    <View>
                        <Text style={styles.itemHeading}>{order.date}</Text>
                        <Text style={{color:"#8F1D1D"}}>Total amount : ₹{order.amt}</Text>
                        <Text style={styles.description}>Total items : {order.qty}</Text>
                    
                        {/* <Text style={styles.itemHeading}>Order ID : {order.id}</Text> */}
                    
                    </View>
             </TouchableOpacity>
            ))
        }
       
        
       
        
           
            
            
        </ScrollView>
        
              
                {/* <TouchableOpacity style={styles.bottombtn}>
                    <Image source={require("../../assets/orders/filter.png")}/>
                </TouchableOpacity> */}
           
     </View> 
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
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    
    item:{
        
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
        height:100,
        padding:15,
        justifyContent:'space-between',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:0.5,
       width:"85%",
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
        position:'relative',
        width:"100%"
        // top:60,
        // marginBottom:70
    },
    // bottombtn:{
    //     position:'absolute',
    //     right:20,
    //     bottom:10
    // }


})