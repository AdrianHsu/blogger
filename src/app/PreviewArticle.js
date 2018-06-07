import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 10,
  }),
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
          <Typography variant="headline" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Card>
      </div>
    );
  }
}

PreviewArticle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewArticle);