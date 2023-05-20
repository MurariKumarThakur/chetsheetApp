import React, { useContext, useEffect, useState } from "react";
import "./subject.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Divider, Box, TextField, Grid } from "@mui/material";
import SubjectContext from "../../context/subject/subjectContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { NavLink } from "react-router-dom";
const Subject = ({ sub }) => {
  const { _id, subject } = sub;
  const subjectContext = useContext(SubjectContext);
  const { deleteSubject, updateSubject, setCurrent, clearCurrent, current } =
    subjectContext;

  useEffect(() => {
    if (current != null) {
      setSubValue(current);
    } else {
      setSubValue({
        subject: "",
      });
    }
  }, [subjectContext, current]);

  const [subValue, setSubValue] = useState({
    _id,
    subject: "",
  });

  const clearinputfield = () => {
    setSubValue({
      _id,
      subject: "",
    });
  };

  const [open, setOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const openpopup = () => {
    setCurrent(sub);
    setOpen(true);
  };

  const handleConfirmation = () => {
    setDeletePopup(false);
  };
  const openConfirmationBox = () => {
    setDeletePopup(true);
  };

  const handleClose = () => {
    clearCurrent();
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(subValue);
    updateSubject(subValue);

    clearCurrent();
    setOpen(false);
  };
  const handleCurrent = () => {
    setCurrent(sub);
    console.log(current);
  };

  const onDelete = () => {
    deleteSubject(_id);
    clearCurrent();
    setDeletePopup(false);
  };
  const onChange = (e) => {
    setSubValue({ ...subValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="subjectcontainer">
        <div>
          <p style={{ textAlign: "center" }}>
            <div>
              <NavLink
                onClick={handleCurrent}
                to={`/subject/${_id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                {subject}
              </NavLink>
            </div>
          </p>
        </div>

        <div className="action">
          <div>
            <EditIcon onClick={openpopup} />
            <DeleteForeverIcon onClick={openConfirmationBox} />
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Subject"}</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Box component="form">
              <TextField
                margin="normal"
                name="subject"
                value={subValue.subject}
                onChange={onChange}
                required={true}
                fullWidth
                id="subject"
                label="Enter subject name"
                autoFocus
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
                disabled={!subValue.subject}
                type="submit"
                variant="contained"
                color="success"
              >
                Update
              </Button>
              <Button
                disabled={!subValue.subject}
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
              <p> Are you sure , you want to delete the Subject ? </p>
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

export default Subject;
