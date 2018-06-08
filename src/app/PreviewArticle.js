import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 6,
  }),
  button: {
    margin: theme.spacing.unit,
  },
});

class PreviewArticle extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Card className={classes.root} elevation={4}>
          <Typography variant="headline">
            {this.props.title}
          </Typography>
          <Typography variant="caption">
            {this.props.time}
          </Typography>
          <Typography variant="body1">
            {this.props.content}
          </Typography>
        <Button variant="outlined" color="secondary" className={classes.button}>
          刪除
        </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          修改
        </Button>
        </Card>
      </div>
    );
  }
}

PreviewArticle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewArticle);