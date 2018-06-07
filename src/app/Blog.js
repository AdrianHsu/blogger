import React from 'react';
import {render} from 'react-dom';
import ButtonAppBar from './ButtonAppBar.js';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      hostname: ""
    };
  }
  componentDidMount(){
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject == null) {
      window.alert('登入無效，請重新登入！');
      this.props.history.push('/login');
    } else {
      // window.alert(retrievedObject + '\n登入成功！');
      // console.log(retrievedObject);
      retrievedObject = JSON.parse(retrievedObject);
      var username = retrievedObject.username;
      document.title = username;
      this.setState({
        username: username
      });

    }
  }
  render() {
    return (<ButtonAppBar history={this.props.history} username={this.state.username} hostname={this.state.hostname}></ButtonAppBar>);
  }
}

export default Blog;