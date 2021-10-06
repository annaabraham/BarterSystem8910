import React,{Component} from 'react';
import {View,Text,StyleSheet,Alert,KeyboardAvoidingView,Modal,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            requestedList : []
        }
        this.requestRef= null
    }
 getRequestedList=()=>{
     this.requestedRef=db.collection('Requested_Objects')
     .onSnapshot((snapshot)=>{
        var requestedList = snapshot.docs.map(document => document.data());
        this.setState({
          requestedList : requestedList
        });
     })
 }
 componentDidMount(){
    this.getRequestedList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.object_name}
        subtitle={object_description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.props.navigation.navigate("objectDescription",{'details':item})
            }}
            >
              
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Exchange Items"/>
        <View style={{flex:1}}>
          {
            this.state.requestedList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested object</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedList}
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