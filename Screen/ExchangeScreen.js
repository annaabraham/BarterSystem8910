import React,{component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class MyDonation extends component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestRef=null
    }
    componentDidMount(){
        this.getTransactions()
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
            subtitle={"Requested by"+item.requested_by+"status"+item.request_status}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            leftElement={<Icon name="book" type="font-awesome" color="Red"></Icon>}
            rightElement={
                <TouchableOpacity style={styles.button,{
                  backgroundColor:item.request_status==="Book sent"?"Green":"Blue"
                }}
                onPress={()=>
                  this.sendBook(item)
                }
               
                >
                  
                  <Text style={{color:'#ffff'}}>item.request_status==="Item sent"?"Item sent":"Send Item"</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
getAllTransactions=()=>{
    this.requestRef=db.collection("All_transactions").where('transactor_id','==',this.state.userId)
    .onSnapShot((snapShot)=>{
        var allTransactions=snapShot.docs.map(document=>document.data());
        this.setState({
           allTransactions:allTransactions 
        });
    })
}
sendNotification=(ItemDetails,requestdStatus)=>{
var requestId=itemDetails.request_id
var transactorId=itemDetails.donor_id
db.collection('all_Notifications').where('request_id','==',requestId)
.where('transactor_id','==',transactorId)
.get()
.then(snapShot=>{
  snapShot.forEach(doc=>{
var message=""
if(requestStatus==="ItemSend"){
  message=this.state.transactorName+"sentyourItem"
}
else{
  message=this.state.transactorName+"has shown interest in donating the item"
}
db.collection('all_notifications').doc(doc.id).update({
  message:message,
  NotificationStatus:'unread',
  date:firebase.firestore.FieldValue.serverTimestamp()
})
  })
})

}
sendBook=(itemDetails)=>{
if(itemDetails.RequestStatus==="Itemsent"){
  var request="transactor Interested"
  db.collection('all_transactions').doc(itemDetails.doc_id).update({
    request_status:"Transactor Interested"
  })
  this.sendNotification(itemDetails.requestStatus)
}
else{
  var request="thing sent"
  db.collection('all_transactions').doc(itemDetails.doc_id).update({
    request_status:"Item sent"
  })
  this.sendNotification(itemDetails.requestStatus)
}
}
render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="My transactions"/>
        <View style={{flex:1}}>
          {
            this.state.allTransactions.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>list of all transactions</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allTransactions}
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
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
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
