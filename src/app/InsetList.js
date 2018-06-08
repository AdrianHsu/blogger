import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 12,
    margin: theme.spacing.unit * 6,
  },
});

class InsetList extends React.Component {
  
  constructor(props) {
    super(props);
  }
  handlePreview = (e) => {
    e.preventDefault();
    
   this.props.previewCb(); 
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav"
          subheader={<ListSubheader component="div">文章列表</ListSubheader>}
                  >
          <ListItem button onClick={e => this.handlePreview(e)}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText inset primary="文章 1" />
          </ListItem>
          <ListItem button>
            <ListItemText inset primary="文章 2" />
          </ListItem>
        </List>
      </div>
    );
  }
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);