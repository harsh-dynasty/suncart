import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../firebase'
export default class OrderSummary extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.route.params.id,
            date:this.props.route.params.date,
            amt:this.props.route.params.amt,
            qty:this.props.route.params.qty,
            items:[
                // {
                //     itemId:54654,
                //     itemName:"Apple iphone 12 pro max",
                //     itemTitle:"Pacific blue 512 gb",
                //     itemDescription:"All screen olded display ,A14 bionic chip",
                //     image:require("../../assets/eachProduct/iphone.png"),
                //     price:15000,
                //     itemQty:4
                // },
            ]
        }
    }
    async componentDidMount(){
        const email=await AsyncStorage.getItem("email")
        const ref=db.collection('users').doc(email)
        ref.collection('orders').doc(this.state.id).collection('orderItems').get()
        .then(items=>{
            items.forEach(item=>{
                const {category,qty}=item.data()
                db.collection(category).doc(item.id).get().then(doc=>{
                    const {image,price,itemTitle,itemName,itemDescription}=doc.data()
                    this.setState({items:[...this.state.items,{
                        itemId:item.id,
                        itemName,
                        itemTitle,
                        itemDescription,
                        image,
                        price:Number(price)*Number(qty),
                        itemQty:qty,
                        category
                    }]})
                })
            })
        })
    }
    render(){
        return(
    //         <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
    <View style={styles.home}>
        <StatusBar backgroundColor='#FFF5E8' />
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/cart/top.png")} style={styles.top}/>
        <Text style={styles.heading}>Order Summary</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView style={styles.scroll}>
        {
            this.state.items.map(item=>(
                <TouchableOpacity style={styles.item} key={item.itemId} onPress={()=>this.props.navigation.navigate("ProductPage",{name:item.itemName,title:item.itemTitle,description:item.itemDescription,price:Number(item.price)/Number(item.itemQty),image:item.image,category:item.category,itemId:item.itemId})}>
                <Image style={styles.image} source={{uri:item.image}}/>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>{item.itemName}</Text>
                    <Text style={styles.itemSubHeading}>{item.itemTitle}</Text>
                    <Text style={styles.description}>{item.itemDescription.slice(0,20)}</Text>
                    <View style={styles.row}>
                    
                    <Text style={styles.price}>₹{item.price}</Text>
                        
                        <Text>Qty : {item.itemQty}</Text>
                    </View>
                </View>
               
              

            </TouchableOpacity>
            ))
        }
        
            {/* <TouchableOpacity style={styles.item}>
                <Image style={styles.image} source={require("../../assets/seller/iphone.png")}/>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>Apple iPhone 12 Pro Max</Text>
                    <Text style={styles.itemSubHeading}>Pacific Blue 512 GB</Text>
                    <Text style={styles.description}>All Screen OLED Display, A14 Bionic Chip</Text>
                    <View style={styles.row}>
                    
                    <Text style={styles.price}>₹1,59,900</Text>
                        
                        <Text>Qty : 2</Text>
                    </View>
                </View>
               
              

            </TouchableOpacity> */}
            
            
            
        </ScrollView>
        <View style={styles.bottom}>
            <Image source={require("../../assets/cart/top.png")}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,position:'absolute',bottom:0,width:"90%"}}>
                <View>
                    {/* <Text style={{fontWeight:'bold',fontSize:16}}>Order ID : {this.state.id}</Text> */}
                    <Text style={{fontWeight:'bold',fontSize:16}}>Total amount : ₹{this.state.amt}</Text>
                    <Text>Total items : {this.state.qty}</Text>
                </View>
               <Text>{this.state.date}</Text>
            </View>
        </View>
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
        
    },
    
   
    item:{
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
        height:100,
        paddingHorizontal:15,
        justifyContent:'flex-start',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:0.5,
        width:350,
        
        alignSelf:'center',
        marginBottom:12
    },
    image:{
        marginRight:20,
        // marginHorizontal:10,
        width:50,
        height:70,
        maxHeight:"75%",
        borderRadius:12
    },
    price:{
        fontWeight:'bold',
        fontSize:16,
        marginRight:10,
        color:"#8F1D1D"
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:16
    },
   
    scroll:{
        position:'relative',
        // top:60,
        // marginBottom:70
    },
    counter:{
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:-3,
        right:5
    },
    counterbtn:{
        position:'relative',
        top:5,
        left:5
    }

})