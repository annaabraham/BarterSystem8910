import React,{component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import db from '../config'
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontSize'
export default class MyTransaction extends component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            RecievedItemList:[]
        }
        this.requestRef=null
    }
    componentDidMount(){
        this.getRecievedItemList()
    }
    componentWillMount(){
       this.requestRef() 
    }
    keyExtractor=(item,index)=>index.toString()

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.itemStatus}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            leftElement={<Image style={style.liimage} source={{uri:item.image_link}}></Image>}
            bottomDivider
          />
        )
      }
getRecievedItemList=()=>{
    this.requestRef=db.collection("Requested_items").where('user_id','==',this.state.userId)
    .where("item_Status", "==", "recieved")
    .onSnapShot((snapShot)=>{
        var recievedItemList=snapShot.docs.map(document=>document.data());
        this.setState({
           recieveditemList:recievedItemList
        });
    })
}

render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="My Recieved items list"/>
        <View style={{flex:1}}>
          {
            this.state.RecievedItemList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>list of recieved item list</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.RecievedItemList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize:RFValue(20),
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:RFValue(30),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
