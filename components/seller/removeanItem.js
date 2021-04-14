import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default class RemoveItem extends React.Component{
    render(){
        return(
    //         <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
            
            <View style={styles.container} >
               
               
          <Image source={require("../../assets/seller/top1.png")} style={styles.top}/>
        <Text style={styles.heading}>Remove Items</Text>
        <TouchableOpacity style={styles.homeBtn} onPress={()=>this.props.navigation.popToTop()}> 
            <Entypo name="home" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
                <Ionicons name="ios-filter-sharp" size={24} color="black" />
                <Text style={styles.btntxt}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="sort" size={24} color="black" />
                <Text style={styles.btntxt}>Sort</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.item}>
                <Image style={styles.image} source={require("../../assets/seller/iphone.png")}/>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>Apple iPhone 12 Pro Max</Text>
                    <Text style={styles.itemSubHeading}>Pacific Blue 512 GB</Text>
                    <Text style={styles.description}>All Screen OLED Display, A14 Bionic Chip</Text>
                    <Text style={styles.price}>₹1,59,900</Text>
                </View>
                
                <TouchableOpacity style={styles.delete}>
                    <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>

            </TouchableOpacity>
         
            
        </ScrollView>
      
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
        
        alignItems: 'center',
       paddingTop:100,
        width:"110%",
      },
    top:{
        width:"100%",
        position:'absolute',
        top:-60
        
    },
    heading:{
        alignSelf:'flex-start',
        fontWeight:'bold',
        fontSize:30,
        position:'absolute',
        top:50,
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
        
        justifyContent:'space-between',
        alignItems:'center',
        borderStyle:'solid',
        borderWidth:0.5,
        width:"92%",
        
        alignSelf:'center',
        marginBottom:12
    },
    image:{
        marginHorizontal:10
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
    delete:{
        position:'relative',
        top:-35,
        left:-10,
        
    },
    scroll:{
        position:'relative',
        top:60,
        marginBottom:70
    },
    button:{
        flexDirection:'row',
        backgroundColor:'white',
        paddingHorizontal:5,
        alignItems:'center',
        borderRadius:15
    },
    btntxt:{
        marginHorizontal:10,
        
    },

})