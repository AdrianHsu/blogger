import React from 'react';
import {render} from 'react-dom';
import ButtonAppBar from './ButtonAppBar.js';
import PreviewArticle from './PreviewArticle.js';
import { Grid } from '@material-ui/core';
import InsetList from './InsetList.js';
import EditIcon from '@material-ui/icons/ModeEdit';
import Button from '@material-ui/core/Button';
import EditArticle from './EditArticle.js';

const styles = {
  bg: {
    backgroundSize: 'cover',
    // backgroundImage: 'url("/assets/blog.jpg")'
  }
};

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      hostname: "",
      title: 'title',
      time: Date(),
      content: "hihihi",
      mode: "preview"
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
      var host = this.props.location.pathname.split('/')[2];
      if(host === username) {
        host = "您";
      }
      this.setState({
        username: username,
        hostname: host
      });

    }
  }
  funcArticle(){
    if(this.state.mode === "none"){
      return null;
    } else if(this.state.mode === "preview"){
      return <PreviewArticle title={this.state.title} time={this.state.time} content={this.state.content}/>;
    } else if(this.state.mode === "edit"){
      return <EditArticle 
        title={this.state.title} time={this.state.time} content={this.state.content}
        handleTitleCb={this.handleTitleCb} handleContentCb={this.handleContentCb}/>;
    }
  }
  handleFab = (e) => {
    e.preventDefault();
    this.setState({
      mode: "edit"
    });
  }
  previewCb = () => {
    this.setState({
      mode: "preview",
    });
  }
  handleTitleCb = (v) => {
    this.setState({
      title: v
    })
  }
  handleContentCb = (v) => {
    this.setState({
      content: v
    })
  }

  render() {
    
    return (
    <div>
    <ButtonAppBar history={this.props.history} 
      username={this.state.username} 
      hostname={this.state.hostname}>
    </ButtonAppBar>
    <Grid container spacing={24}>
      <Grid item xs={12} sm={9}>
      {this.funcArticle()}
      </Grid>
      <Grid item xs={8} sm={2}>
      <InsetList mode={this.state.mode} previewCb={this.previewCb}/>
      </Grid>
    </Grid>
    <Button variant="fab" color="secondary" onClick={e => this.handleFab(e)}
      style={{position: 'absolute',
        bottom: 30,
        right: 30}}>
      <EditIcon/>
    </Button>

    </div>);
  }
}

export default Blog;