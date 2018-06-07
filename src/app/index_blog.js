import React from 'react';
import {render} from 'react-dom';
import ButtonAppBar from './ButtonAppBar.js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: ""
    };
  }
  componentDidMount(){
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject == null) {
      window.alert('登入無效，請重新登入！');
      window.location = '/login';
    } else {
      // window.alert(retrievedObject + '\n登入成功！');
      // console.log(retrievedObject);
      retrievedObject = JSON.parse(retrievedObject);
      var username = retrievedObject.username;
      this.setState({
        username: username
      });
    }
  }
  render() {
    return (<ButtonAppBar username={this.state.username}></ButtonAppBar>);
  }
}

render (<App/>, document.getElementById('app'));