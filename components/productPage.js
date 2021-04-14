import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import {db} from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ProductPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            category:this.props.route.params.category,
            itemId:this.props.route.params.itemId,
            itemName:(this.props.route.params.name),
            itemTitle:this.props.route.params.title,
            price:this.props.route.params.price,
            description:this.props.route.params.description,
            image:this.props.route.params.image
        }
       
    }
   async addToCart(){
    const {itemId,category}=this.state
    const email= await AsyncStorage.getItem('email')

    const dbref=db.collection("users").doc(email);

    dbref.collection("cartItems").doc(itemId).set({
        category,qty:1
    });

    this.props.navigation.goBack()
    alert(this.state.itemName+" added to cart.")
   }
    render(){
        return(
            <View style={styles.home}>
            <StatusBar backgroundColor='#FFF5E8' />
    
            
            <View style={styles.container} >
                <ScrollView style={styles.scroll}>
               
                     <View style={styles.background}>
                        <View style={styles.whiteBack}>
                            <Image source={{uri:this.state.image}} style={styles.itemImg}/>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.heading}>{this.state.itemName}</Text>
                            <Text>{this.state.itemTitle}</Text>
                            <Text style={styles.price}>₹{this.state.price}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.icon} onPress={()=>this.addToCart()}>
                      
                        <Ionicons  name="add-circle" size={60} color="#647A77" />
                        <Text>Add to cart</Text>

                    </TouchableOpacity>
                    <View style={styles.description}>
                        <Text style={[{...styles.heading},{textDecorationLine:'underline',fontWeight:'bold',color:'brown'}]}>Product Description</Text>
                        
                                
                               <Text> {this.state.description}</Text>
                               
                               {/* <Text> 12MP + 12MP + 12MP | 12MP Front Camera</Text>
                               <Text> A14 Bionic Chip with Next Generation Neural </Text>
                               <Text> Engine Processor</Text>
                               <Text> Ceramic Shield | IP68 Water Resistance</Text>
                               <Text> All Screen OLED Display</Text>
                               <Text> LiDAR Scanner for Improved AR Experiences</Text> */}

                       
                    </View>
       
        
           
           
                 </ScrollView>
      
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
      
        width:"110%",
      },
      background:{
        paddingTop:50,
        backgroundColor:'#FFF5E8',
        width:"100%"
      },
     itemImg:{
       alignSelf:'center',
       width:"100%",
       height:400
     },
     scroll:{
         width:"100%"
     },
     whiteBack:{
         backgroundColor:'white',
         width:"70%",
         alignSelf:'center',
         padding:15,
         borderRadius:15,
         borderWidth:1,
         borderBottomWidth:10,
         borderColor:"#4F1717"
     },
     title:{
         width:"100%",
        
         display:'flex',
         alignItems:'center'
     },
    heading:{
        fontSize:20
    },
    price:{
        color:"green",
        fontSize:16,
        marginBottom:10
    },
    description:{
        position:'relative',
        top:-50,
       
        paddingVertical:15,
        paddingHorizontal:30
    },
    icon:{
        position:'relative',
        right:"-75%",
        top:-30,
        
    }
    

})