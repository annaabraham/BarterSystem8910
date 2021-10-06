import React,{component} from 'react';
import{Text,View,StyleSheet,KeyboardAvoidingView,Alert,TextInput} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyBarter extends component{
  constructor(){
      super()
      this.state={
          userId:firebase.auth().currentUser.email,
          allTransactions:[]
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
  renderItem=({item,i})=>{
      return(
          <ListItem
          key={i}
          title={item.thing_Name}
          subtitle={item.reason_to_request}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          rightElement={
              <TouchableOpacity style={styles.button}
              onPress={()=>{
                this.props.navigation.navigate("recieverdetails",{'details':item})
              }}
              >
       <Text style={{color:'#ffff'}}>item.request_status==="Thing sent"?"Thing sent":"Send Thing"</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
      )
  }
  getAllTransactions=()=>{
    this.requestRef=db.collection("All_Transactions").where('transactor_id','==',this.state.userId)
    .onSnapShot((snapShot)=>{
        var allTransactions=snapShot.docs.map(document=>document.data());
        this.setState({
           allTransactions:allTransactions 
        });
    })
  }
  sendNotification=(ItemDetails,requestIdStatus)=>{
    var requestId=ItemDetails.request_id
    var TransactorId=ItemDetails.donor_id
    db.collection('all_Notifications').where('request_id','==',requestId)
    .where('Transactor_id','==',TransactorId)
    .get()
    .then(snapShot=>{
      snapShot.forEach(doc=>{
    var message=""
    if(requestStatus==="ItemSend"){
      message=this.state.TransactorName+"sentyourItem"
    }
    else{
      message=this.state.TransactorName+"has shown interest in donating the Item"
    }
    db.collection('all_notifications').doc(doc.id).update({
      message:message,
      NotificationStatus:'unread',
      date:firebase.firestore.FieldValue.serverTimestamp()
    })
      })
    }) 
    }
    sendItem=(ItemsDetails)=>{
      if(ItemsDetails.RequestStatus==="Itemsent"){
        var request="Transactor Interested"
        db.collection('all_transactions').doc(thingDetails.doc_id).update({
          request_status:"transactor Interested"
        })
        this.sendNotification(ItemDetails.requestStatus)
      }
      else{
        var request="Item sent"
        db.collection('all_transactions').doc(ItemDetails.doc_id).update({
          request_status:"Item sent"
        })
        this.sendNotification(ItemDetails.requestStatus)
      }
      }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Donate Thing"/>
        <View style={{flex:1}}>
          {
            this.state.requestedThingsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Thing</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedThingsList}
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