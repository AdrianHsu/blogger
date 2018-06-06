import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
var sha256 = require('js-sha256');

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      field_user: "",
      field_pass: "",
      error: false
    };
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject != null) {
      window.alert(retrievedObject + '\n您已經登入，重新導向至聊天室...');
      window.location = '/chatroom';
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false
    });
  };

  toggleLogin = e => {
    // Math.random().toString(36).substr(2, 5);
    var re = RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$');
    if(this.state.field_user.match(re) === null) {
      
      window.alert('請重新輸入：暱稱需為英文字與數字的組合。');
      this.setState({
        error: true,
        field_user: "",
        field_pass: ""
      });
      return;
    }  
    axios.post('/user/login', {
      username: this.state.field_user,
      password: sha256(this.state.field_pass),
      updateTime: Date()
    })
    .then((res) => {
      if(res.data != 'not found') { // no error

        sessionStorage.clear(); // clear old data
        var userInfo = { 'username': this.state.field_user, 
          'password': sha256(this.state.field_pass)};
        sessionStorage.setItem('userInfo', JSON.stringify( userInfo ));
        // var retrievedObject = sessionStorage.getItem('userInfo');
        // console.log('retrievedObject: ', JSON.parse(retrievedObject));

        window.alert(userInfo['username'] + ': 登入成功！');
        window.location = '/blog';
      } else { // _message is ERROR message, error occurs!
        console.log(res.data);
        window.alert(res.data);
        this.setState({
          error: true,
          field_user: "",
          field_pass: ""
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  signUpPage = e => {
    axios.get('/redirect?page=signup')
    .then(function (res) {
      console.log(res);
      window.location = '/signup';
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  render() {
    return (
      <Dialog 
        open 
        onRequestClose={this.toggleLogin}
        fullScreen={this.props.fullScreen}>
        <DialogTitle>登入</DialogTitle>
        <DialogContent>
          <DialogContentText>
            請輸入您的暱稱與密碼。
          </DialogContentText>
          <TextField
            autoFocus
            error={this.state.error}
            margin="dense"
            id="username"
            label="暱稱"
            type="username"
            value={this.state.field_user}
            onChange={this.handleChange('field_user')}
            fullWidth
          />
          <TextField
            autoFocus
            error={this.state.error}
            margin="dense"
            id="password"
            label="密碼"
            type="password"
            value={this.state.field_pass}
            onChange={this.handleChange('field_pass')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.signUpPage} color="secondary">
            註冊
          </Button>
          <Button onClick={this.toggleLogin} color="primary">
            確認
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Login;