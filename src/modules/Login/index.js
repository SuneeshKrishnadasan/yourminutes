import React, {Component} from 'react';
import { View ,ActivityIndicator} from 'react-native'
import LoginForm from "./../../components/login/loginform"
import {styles} from "./../../style"
import { connect } from "react-redux";
import { compose } from "recompose";
import Loading from "./../../effects/loading"


const mapDispatchToProps = ({ loginModal }) => {
  return {
    ...loginModal
  };
};

const mapStateToProps = ({ loginModal }) => {
  return {
    ...loginModal
  };
};

class Page extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
    }
  }

  static navigationOptions = {
        title: "PAGE NAME",
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', },
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //   if (nextProps.loginStatus) {
    //     nextProps.navigation.replace('Home')
    // }
    // return null
    // }  

    componentWillReceiveProps(nextProps){
      if (nextProps.loginStatus) {
        this.props.navigation.replace('Home')
    }
    }

  render() {
  	return (
    <Loading loading = {this.props.loading}>
      <View style={[ styles.horizontal]} >
        <LoginForm onSubmit = {(values)=> {
          console.log("called")
           this.props.login(values)}}/>
      </View>
    </Loading>); 
  }
}
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Page);