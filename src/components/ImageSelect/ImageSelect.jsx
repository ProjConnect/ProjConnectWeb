/* eslint-disable react/forbid-prop-types, object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function ImageSelect(props) {
  const { dialog, setDialog, form, setForm, value, imageSet, description } = props;
  return (
    <Dialog open={dialog} onClose={() => setDialog(false)}>
      <DialogTitle>
        <Grid container>
          <Grid xs={11}>
            <Typography variant="h3">{description}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={() => setDialog(false)}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container xs={12} spacing={2}>
          {/* eslint-disable-next-line arrow-body-style */}
          {imageSet.map((image, index) => {
            return (
              <Grid
                item
                xs={4}
                onClick={() => {
                  setForm({ ...form, [value]: index });
                }}
              >
                <Grid
                  padding="10px"
                  backgroundColor={form[value] === index ? 'black' : 'white'}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      height: '124px',
                      width: '124px',
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

ImageSelect.propTypes = {
  dialog: PropTypes.bool.isRequired,
  setDialog: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  imageSet: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageSelect;
