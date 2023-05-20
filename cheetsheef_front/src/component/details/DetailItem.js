import React, { useState, useContext, useEffect } from "react";
import "./detail.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Divider, Box, TextField, Grid } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DetailContext from "../../context/detail/detailContext";
import DialogTitle from "@mui/material/DialogTitle";
import { CopyToClipboard } from "react-copy-to-clipboard";
const DetailItem = ({ detail }) => {
  const detailContext = useContext(DetailContext);
  const { setCurrent, clearCurrent, current, updateDetail, deleteDetail } =
    detailContext;
  const { _id, context, code, description } = detail;

  const [open, setOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [copied, setCopied] = useState("");
  const [subValue, setSubValue] = useState({
    _id,
    context,
    code,
    description,
  });

  useEffect(() => {
    if (current != null) {
      setSubValue(current);
    } else {
      setSubValue({
        _id,
        context: ``,
        code: ``,
        description: ``,
      });
    }
  }, [detailContext, current]);

  const openpopup = () => {
    setCurrent(detail);
    setOpen(true);
  };

  const handleConfirmation = () => {
    setDeletePopup(false);
  };
  const openConfirmationBox = () => {
    setDeletePopup(true);
  };

  const handleClose = () => {
    //clearCurrent()
    setOpen(false);
  };

  const clearinputfield = () => {
    setSubValue({
      _id,
      context: ``,
      code: ``,
      description: ``,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(subValue);
    updateDetail(subValue);

    clearCurrent();
    setOpen(false);
  };

  const onDelete = () => {
    deleteDetail(_id);
    clearCurrent();
    setDeletePopup(false);
  };
  const onChange = (e) => {
    setSubValue({ ...subValue, [e.target.name]: e.target.value });
  };

  const showCopyMessage = () => {
    setCopied("code copied in to clipboard");
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="detailContainer">
      <div className="detailStyle" key={detail._id}>
        <div className="action">
          <EditIcon onClick={openpopup} />
          <DeleteForeverIcon onClick={openConfirmationBox} />
        </div>
        <div className="detailContext">
          <p className="header">Context :</p>
          <p>{detail.context}</p>
        </div>
        <div className="detailCode">
          <p className="header">
            Code :
            <CopyToClipboard text={detail.code}>
              <div className="codeCopied">
                <p>{copied}</p>
                <ContentCopyIcon
                  onClick={showCopyMessage}
                  titleAccess="copyToClipboard"
                  className="copyIcon"
                />
              </div>
            </CopyToClipboard>
          </p>
          <div className="codeContainer">
            <pre>{detail.code}</pre>
          </div>
        </div>
        <div className="detailDescription">
          <p className="header">Description :</p>
          <p>{detail.description}</p>
        </div>
      </div>

      <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update The Point"}</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Box component="form">
              <TextField
                margin="normal"
                name="context"
                value={subValue.context}
                onChange={onChange}
                required={true}
                fullWidth={true}
                id="context"
                label="Provide the context"
                autoFocus
              />
              <TextField
                margin="normal"
                name="code"
                value={subValue.code}
                onChange={onChange}
                id="code"
                fullWidth={true}
                label="Write your code here"
                multiline
              />
              <TextField
                name="description"
                value={subValue.description}
                onChange={onChange}
                margin="normal"
                fullWidth={true}
                id="description"
                label="Write description here"
                multiline
              />

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
              <Grid container></Grid>
            </Box>

            <DialogActions>
              <Button
                disabled={!subValue.context && !subValue.description}
                type="submit"
                variant="contained"
                color="success"
              >
                Update
              </Button>
              <Button
                disabled={!subValue.context && !subValue.description}
                onClick={() => clearinputfield()}
                variant="outlined"
                color="info"
              >
                Clear
              </Button>
              <Button onClick={handleClose} variant="outlined" color="error">
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
      {/* 
           Delete confirmation
      */}
      <Dialog
        open={deletePopup}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" Confirmation"}</DialogTitle>

        <DialogContent>
          <Box component="form">
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
            <Grid container>
              <p> Are you sure , you want to delete the context ? </p>
            </Grid>
          </Box>

          <Divider />
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onDelete}
              type="submit"
              variant="contained"
              color="error"
            >
              Yes
            </Button>

            <Button
              style={{ marginLeft: "80px" }}
              onClick={handleConfirmation}
              variant="outlined"
              color="error"
            >
              NO
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailItem;
