import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import Typography from '@material-ui/core/Typography';

const styles = {
};

class GameDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          {...other}  
        >
          <DialogTitle id="alert-dialog-title">{"Congratulations!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                You won! 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>



    );
  }
}

GameDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(GameDialog);
