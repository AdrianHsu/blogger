import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuDrawer from './MenuDrawer.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  }
};

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);
  }
  redirectAuth(e) {
    e.preventDefault();

    sessionStorage.clear();
    window.location = '/login';
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <MenuDrawer />
            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.username} 的網誌
            </Typography>
            <Button onClick={e => this.redirectAuth(e)}>
              登出
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);