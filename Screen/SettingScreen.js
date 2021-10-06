import React,{Component} from 'react'
import{Text,View,StyleSheet,TouchableOpacity,KeyboardAvoidingView, TextInput, Alert} from 'react-native'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends Component{
    constructor(){
     super()
     this.state={
         emailId:'',
         firstName:'',
         lastName:'',
         docId:'',
         contact:'',
         address:''
     }
      }
     
     updateUserDetails=()=>{
         db.collection('users').doc(this.state.docId).update({
             firstName:this.state.firstName,
             lastName:this.state.lastName,
             address:this.state.address,
             contact:this.state.contact

         })
         Alert.alert("Profile Details Updated Successfully")
     }
     getUserDetails=()=>{
         var email=firebase.auth().currentUser.email
         db.collection('users').where('email_id','==',email).get()
         .then(snapShot=>{
             snapShot.forEach(doc=>{
                 var data=doc.data()
                 this.setState({
                     emailId:data.emailId,
                     firstName:data.firstName,
                     lastName:data.lastName,
                     address:data.address,
                     contact:data.contact,
                     docId:data.docId
                 })
             })
         })
     }
     componentDidMount(){
         this.getUserDetails()
     }
      render(){
        return(
          <View
          ><MyHeader title="Settings"
          navigation={this.props.navigation}/>
          <View>
              <TextInput
                  style={styles.FormTextInput}
                  placeHolder={"FirstName"}
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          firstName: text
                      })
                  }}>
              </TextInput>
              <TextInput
                  style={styles.formTextInput}
                  placeHolder={"LastName"}
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          lastName: text
                      })
                  }}>
              </TextInput>
              <TextInput
                  style={styles.formTextInput}
                  placeHolder={"emailId"}
                  keyboardType={'email-address'}
                  onChangeText={(text)=>{
                      this.setState({
                          emailId: text
                      })
                  }}>
              </TextInput>
              <TextInput
                  style={styles.formTextInput}
                  placeHolder={"contact"}
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                      this.setState({
                          contact: text
                      })
                  }}>
              </TextInput>
              <TextInput
                  style={styles.formTextInput}
                  placeHolder={"Address"}
                  multiLine={true}
                  onChangeText={(text)=>{
                      this.setState({
                          address: text
                      })
                  }}>
              </TextInput>
          <TouchableOpacity
          style={styles.button}
          onPress={()=>{
              this.updateUserDetails()
          }}
         >
             <Text>Save</Text>
              </TouchableOpacity>      
          </View>
          </View> 
        )
    }
}
const styles=StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:'#ff9800',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:8,
    },
    

    }
})