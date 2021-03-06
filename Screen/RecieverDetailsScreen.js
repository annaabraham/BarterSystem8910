import React,{Component} from 'react'
import{Text,View,StyleSheet,TouchableOpacity,KeyboardAvoidingView,TextInput,Card} from 'react-native'
import firebase from 'firebase'
import { Header } from 'react-native/Libraries/NewAppScreen'

export default class recieverDetailScreen extends Component{

  constructor(props){
     super(props)
     this.state={
userId:firebase.auth().currentUser.email,
recieverId:this.props.navigation.getParam('details')["user_Id"],
requestId:this.props.navigation.getParam('details')["request_Id"],
itemName:this.props.navigation.getParam('details')["item_Name"],
reason_For_Requesting:this.props.navigation.getParam('details')["reason_To_Request"],
recieverName:'',
recieverContact:'',
recieverAddress:'',
recieverRequestDocId:''
     } 
  }
  getRecieverDetailsScreen(){
db.collection('users').where('email_Id','==',this.state.recieverId).get()
.then(snapShot=>{
    snapShot.forEach(doc => {
    this.setState({
        recieverName:doc.data().first_name,
        recieverContact:doc.data().contact,
        recieverAddress:doc.data().address
    })    
    });
})
db.collection('request_items').where('request_id','==',this.state.requestId).get()
.then(snapShot=>{
    snapShot.forEach(doc=>{
        this.setState({
            recieverRequestDocId:doc.id
        })
    })
})
  }
  updateItemStatus=()=>{
db.collection('all_transactions').add({
    item_Name:this.state.itemName,
    request_id:this.state.requestId,
    requested_by:this.state.recieverName,
    transactor_id:this.state.userId,
    request_status:"Transactor Interested"
})
  }
  componentDidMount(){
      this.getRecieverDetailsScreen()
  }
  addNotification=()=>{
      var message=this.state.userName+"has shown interest in donating the item"
     db.collection('all_Notifications').add({
         userId:this.state.recieverId,
         transactorId:this.state.userId,
         request_Id:this.state.requestId,
         itemName:this.state.itemName,
         date:firebase.firestore.FieldValue.serverTimestamp(),
         notificationStatus:'unread',
         message:message
     })
  }
    render(){
        return(
         <View>

             <View style={{flex:0.1}}>
             <Header
             leftComponent={
                 <Icon name='arrow-left'
                 type='feather'
                 color='#696969'
                 onPress={()=>
                     this.props.navigation.goback()}/>}
             centerComponent={{
                text:"donate items",
                style:{color:'#90A5A9'},
                fontSize:20,
                fontWeight:"bold",
            }}
             backgroundColor="Blue"
             />
             </View>
             <View style={{flex:0.3}}>
             <Card
             title={
                 "ItemInformation"
             }
             titleStyle={{
                 fontSize:20
             }}
             >
                 <Card><Text style={{fontWeight:'bold'}}>
                     Name:{this.state.itemName}
                     </Text></Card>

                     <Card><Text style={{fontWeight:'bold'}}>
                     reason:{this.state.reason_For_Requesting}
                     </Text></Card>
             
             </Card>
             </View>
             <View style={{flex:0.3}}>
                 <Card
                 title={
                     "RecieverInformation"
                 }
                 titleStyle={{
                     fontSize:20
                 }}
                 >
                <Card>
                    <Text style={{fontWeight:'bold'}}>
                        Name:{this.state.recieverName}
                    </Text>
                </Card>
                <Card>
                    <Text style={{fontWeight:'bold'}}>
                        contact:{this.state.recieverContact}
                    </Text>
                </Card>
                <Card>
                    <Text style={{fontWeight:'bold'}}>
                        Address:{this.state.recieverAddress}
                    </Text>
                </Card>
                 </Card>
             </View>
             <View style={Styles.buttonContainer}>
             {
                 this.state.recieverId!==this.state.userId?
                 (
                     <TouchableOpacity style={Styles.Button}
                     onPress={()=>{
                         this.updateBookStatus()
                         this.addNotification()
                         this.props.navigation.navigate('myTransaction')
                     }}
                     >
                    <Text>
                        I want to donate
                    </Text>
                     </TouchableOpacity>
                 ):null
             }
             </View>
         </View>   
        )
    }
}