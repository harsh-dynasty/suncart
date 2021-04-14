import React from 'react'
import { StyleSheet, Text, View,Image, TextInput ,TouchableOpacity, ScrollView} from 'react-native';
import {db} from '../firebase'

import { StatusBar } from 'expo-status-bar';
import { Entypo,Ionicons } from '@expo/vector-icons';
import { FontAwesome ,Feather,MaterialCommunityIcons} from '@expo/vector-icons';

export default class BrowseProducts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchInput:'',
            isSearching:false,
            category:"computers",
            items:[
                // {
                //     itemId:54654,
                //     itemName:"Apple iphone 12 pro max",
                //     itemTitle:"Pacific blue 512 gb",
                //     itemDescription:"All screen olded display ,A14 bionic chip",
                //     image:require("../assets/eachProduct/iphone.png"),
                //     price:15000
                // },
                
            ],
            searchItems:[]
        }
        this.loadItems=this.loadItems.bind(this)
        this.loadCategory=this.loadCategory.bind(this)
        // this.handleSearch=this.handleSearch.bind(this)
    }
    // handleSearch(txt){
      
    //     var regex = new RegExp(txt,'i')
      
    //         this.setState({
    //             items:this.state.items.filter(item=>regex.test(item.itemName))
    //         })
      
       
    // }
    componentDidMount(){
        // var docRef = db.collection(this.state.category);
        
        // docRef.get().then((doc) => {

        //     doc.forEach(item => {
        //         this.setState({items:[...this.state.items,
        //             {
        //                 itemId:item.id,
        //                 itemName:item.data()['itemName'],
        //                 itemTitle:item.data()['itemTitle'],
        //                 itemDescription:item.data()["itemDescription"],
        //                 image:item.data()['image'],
        //                 price:item.data()['price']
        //             }
        //         ]})
                
        //     });
        // }).catch((error) => {
        //     console.log("Error getting document:", error);
        // });
        this.loadItems(this.state.category)
       
    }
    loadCategory(category){
        this.setState({category:category})
        this.loadItems(category)
    }
    loadItems(category){
        this.setState({items:[]})
        var docRef = db.collection(category);
        
        docRef.get().then((doc) => {
            
                doc.forEach(item => {
                    this.setState({items:[...this.state.items,
                        {
                            itemId:item.id,
                            itemName:item.data()['itemName'],
                            itemTitle:item.data()['itemTitle'],
                            itemDescription:item.data()["itemDescription"],
                            image:item.data()['image'],
                            price:item.data()['price']
                        }
                    ]})
                    
                });
            
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        
       
    }
    render(){
        var regex=new RegExp(this.state.searchInput,'i')
        return(
   
    <View style={styles.home}>
    <StatusBar backgroundColor='#FFF5E8' />
            <View style={styles.container} >
               
               
          <Image source={require("../assets/browseProducts/top.png")} style={styles.top}/>
          <View style={styles.header}>
              {!this.state.isSearching?
              (<View style={styles.headerFirstRow}>
                <Text style={styles.heading}>Browse Products</Text>
                <View style={{flexDirection:'row',width:"30%",justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Cart")}>
                <Feather name="shopping-cart" size={24} color="black" />
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.setState({isSearching:true})}>
               <FontAwesome name="search" size={24} color="black" />
               </TouchableOpacity>
                </View>
             </View>):(
                 <View style={styles.headerFirstRow}>
                 <TextInput style={styles.searchBar} onChangeText={(txt)=>this.setState({searchInput:txt})} placeholder="Search Items" autoFocus></TextInput>
                 <View style={{flexDirection:'row',width:"20%",marginLeft:15,justifyContent:'space-between'}}>
                
                {/* <TouchableOpacity >
                    <FontAwesome name="search" size={24} color="#413F3F" />
                </TouchableOpacity> */}
                <TouchableOpacity  onPress={()=>this.setState({isSearching:false,searchInput:''})}>
                    <Entypo name="circle-with-cross" size={24} color="red" />
                </TouchableOpacity>
                 </View>
              </View>
             )}
         
          
          <View style={styles.headerSecondRow}>
          <TouchableOpacity onPress={()=>this.loadCategory("computers")}>
                <Image style={styles.typeIcon} source={require("../assets/browseProducts/computer.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.loadCategory("smartphones")}>
                <Image style={styles.typeIcon} source={require("../assets/browseProducts/mobile.png")}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.loadCategory("accessories")}>
                <Image style={styles.typeIcon} source={require("../assets/browseProducts/accessories.png")}/>
            </TouchableOpacity>
          </View>
          </View>
        {/* <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
                <Ionicons name="ios-filter-sharp" size={24} color="black" />
                <Text style={styles.btntxt}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="sort" size={24} color="black" />
                <Text style={styles.btntxt}>Sort</Text>
            </TouchableOpacity>
        </View> */}
        <ScrollView style={styles.scroll} bounces>
        
           {   (this.state.items.length==0)?(<Text>Loading items...</Text>):
               this.state.items.map(item=>{
                   if(regex.test(item.itemName))
                return(
                <TouchableOpacity 
                    key={item.itemId}
                    style={styles.item} 
                    onPress={
                        ()=>this.props.navigation.navigate("ProductPage",{name:item.itemName,title:item.itemTitle,description:item.itemDescription,price:item.price,image:item.image,category:this.state.category,itemId:item.itemId})
                }>
                <Image style={styles.image} source={{uri:item.image}}/>
                <View style={styles.text}>
                    <Text style={styles.itemHeading}>{item.itemName}</Text>
                    <Text style={styles.itemSubHeading}>{item.itemTitle}</Text>
                    <Text style={styles.description}>{item.itemDescription.slice(0,40)}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                </View>
            </TouchableOpacity>
               )})
           }
           
            
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
       paddingTop:150,
        width:"110%",
      },
      searchBar:{
            backgroundColor:'white',
            borderRadius:50,
            width:"90%",
            paddingHorizontal:15,
            fontWeight:'bold'
      },
    top:{
        width:"100%",
        position:'absolute',
        top:0
        
    },
    
    typeIcon:{
        width:100,
        height:100
    },
    header:{
        position:'absolute',
        top:30,
        left:40,
       
        width:"80%",
        
        alignItems:'center'
    },
    headerFirstRow:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
    },
    headerSecondRow:{
        paddingTop:10,
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    heading:{
       
        // fontWeight:'bold',
        fontSize:25,
       
        
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
    row:{
        position:'relative',
        top:40,
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-evenly'
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
        // width:"95%",
        width:350,
        alignSelf:'center',
        marginBottom:12
    },
    image:{
        marginHorizontal:10,
        width:55,
        height:75,
        maxHeight:"75%",
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
        position:'relative',
        top:60,
        marginBottom:70
    }

})