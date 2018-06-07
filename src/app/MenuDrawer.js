import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';


const styles = {
  list: {
    width: 250,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
    };
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  redirectAuth = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push('/login');
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
        <ListItem dense button >
              <Avatar alt="user" src="/assets/bot.png" />
              <ListItemText primary={this.props.username + "，歡迎回來！"} />
        </ListItem>
        <ListItem button>
          我的網誌
        </ListItem>
        <ListItem button>
          用戶列表
        </ListItem>
        <ListItem button onClick={e => this.redirectAuth(e)}>
          登出
        </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} 
            color="inherit" aria-label="Menu">
          <MenuIcon/>
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);