import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import {db} from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            cartAmt:0,
            cartQty:0,
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
                // {
                //     itemId:456,
                //     itemName:"2",
                //     itemTitle:"Pacific blue 512 gb",
                //     itemDescription:"All screen olded display ,A14 bionic chip",
                //     image:require("../../assets/eachProduct/iphone.png"),
                //     price:15000,
                //     itemQty:4
                // },
                // {
                //     itemId:123,
                //     itemName:"3",
                //     itemTitle:"Pacific blue 512 gb",
                //     itemDescription:"All screen olded display ,A14 bionic chip",
                //     image:require("../../assets/eachProduct/iphone.png"),
                //     price:2000,
                //     itemQty:4
                // },
                
            ]
        }
        this.deleteItem=this.deleteItem.bind(this)
        this.editQty=this.editQty.bind(this)
       
    }
    async componentDidMount(){
        const email=await AsyncStorage.getItem('email')
        this.setState({email})
        db.collection("users").doc(email).collection('cartItems').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               
                const category = doc.data()["category"];
                const qty = doc.data()['qty'];
                
                db.collection(category).doc(doc.id).get().then(item=>{
                    const {image,itemDescription,itemName,itemTitle,price}=item.data()
                    console.log(item.data())
                    this.setState({
                        items:[...this.state.items,{
                            itemId:item.id,
                            itemName,
                            itemTitle,
                            itemDescription,
                            image,
                            price,
                            itemQty:qty,
                            category
                        }],
                        cartQty:this.state.cartQty+Number(qty),
                        cartAmt:this.state.cartAmt+Number(price)*Number(qty)
                    })
                })

            });
        });
        
    }
    deleteItem(id,itemQty,rate){
        
        db.collection("users").doc(this.state.email).collection("cartItems").doc(id).delete()
        this.setState({items:this.state.items.filter(item=>item.itemId!=id),cartQty:this.state.cartQty-itemQty,cartAmt:this.state.cartAmt-(rate*itemQty)})
        
    }
    newCartQty(op){
        if(op=="ADD") return this.state.cartQty+1
        return this.state.cartQty-1
    }
    updateQtyinFb(id,newQty,op){
        db.collection("users").doc(this.state.email).collection("cartItems").doc(id).update({qty:newQty})
    }
    editQty(id,op,rate){
       
        var newCartQty=this.state.cartQty
        var newCartAmt=this.state.cartAmt
        if(op=="ADD"){
            newCartQty+=1
            newCartAmt+=Number(rate)
        }
        else{
            newCartQty-=1
            newCartAmt-=Number(rate)
        }
        this.setState({
            item:this.state.items.map(item=>{
                if(id==item.itemId)
                    if(op=="ADD"){
                        item.itemQty+=1
                        this.updateQtyinFb(item.itemId,item.itemQty,"ADD")
                        return item
                    }else{
                        if(item.itemQty>1){
                            item.itemQty-=1
                            this.updateQtyinFb(item.itemId,item.itemQty,"SUBTRACT")
                            return item
                        }
                        else{
                            this.deleteItem(item.itemId,item.itemQty,item.price)
                            
                        }
                    }
                   
                
            }),
            cartQty:Number(newCartQty),
            cartAmt:Number(newCartAmt)
        })
    }
    selectAddress(){
        if(this.state.items.length!=0)
            this.props.navigation.navigate("SelectAdd",{cartAmt:this.state.cartAmt,cartQty:this.state.cartQty})
        else
            alert("Please add items in cart.")
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
        <Text style={styles.heading}>Cart</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView style={styles.scroll}>
        {   (this.state.items.length==0)?(<Text>No items in cart.</Text>):
            this.state.items.map(item=>(
                <TouchableOpacity style={styles.item} key={item.itemId} onPress={()=>this.props.navigation.navigate("ProductPage",{name:item.itemName,title:item.itemTitle,description:item.itemDescription,price:item.price,image:item.image,category:item.category,itemId:item.itemId})}>
                <TouchableOpacity  onPress={()=>this.deleteItem(item.itemId,item.itemQty,item.price)}>
                <Entypo name="circle-with-cross" size={24} color="red" />
                </TouchableOpacity>
                <Image style={styles.image} source={{uri:item.image}}/>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>{item.itemName}</Text>
                    <Text style={styles.itemSubHeading}>{item.itemTitle}</Text>
                    <Text style={styles.description}>{item.itemDescription.slice(0,20)}</Text>
                    <Text style={styles.price}>₹{item.price*item.itemQty}</Text>
                </View>
                
               
                <View style={styles.counter}>
                    <TouchableOpacity style={styles.counterbtn} onPress={()=>this.editQty(item.itemId,"MINUS",item.price)}>
                        <Image source={require("../../assets/cart/minus.png")}/>
                    </TouchableOpacity>
                    <Text >{item.itemQty}</Text>

                    <TouchableOpacity style={styles.counterbtn} onPress={()=>this.editQty(item.itemId,"ADD",item.price)}>
                        <Image source={require("../../assets/cart/plus.png")}/>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
            ))
        }
        
            
            
            
        </ScrollView>
        <View style={styles.bottom}>
            <Image source={require("../../assets/cart/top.png")}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,position:'absolute',bottom:0,width:"90%"}}>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Summary</Text>
                    <Text>Total amount : ₹{this.state.cartAmt}</Text>
                    <Text>Total items : {this.state.cartQty}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.selectAddress()}>
                    <Image source={require("../../assets/cart/continue.png")}/>
                </TouchableOpacity>
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
        fontSize:35,
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
    
    continue:{
        position:'absolute',
        right:20,
        bottom:20,
        
    },
    continuebtn:{
        
        width:90,
        height:90
    },
    item:{
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:15,
        height:100,
        
        justifyContent:'flex-start',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:0.5,
        width:350,
        
        alignSelf:'center',
        marginBottom:12
    },
    image:{
        marginHorizontal:10,
        width:50,
        height:70,
        borderRadius:12
    },
    price:{
        fontWeight:'bold',
        fontSize:16,
        marginRight:10
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:16
    },
    scroll:{
        // position:'relative',
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