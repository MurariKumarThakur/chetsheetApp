import React, { useEffect, useContext, useState } from "react";
import "./detail.css";

import { SpinnerRoundOutlined } from "spinners-react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../../context/auth/authContext";

import { Box, Grid, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import subjectContext from "../../context/subject/subjectContext";
import { Button } from "@mui/material";
import DetailContext from "../../context/detail/detailContext";
import DetailItem from "./DetailItem";

const Details = () => {
  var x = [];

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { loadUser, isAuthenticate } = authContext;
  const detailContext = useContext(DetailContext);
  const subjectcontext = useContext(subjectContext);
  const { details, loading, error, current, addPoint, getAllDetails } =
    detailContext;

  const [subValue, setSubValue] = useState({
    context: ``,
    code: ``,
    description: ``,
  });
  const [search, setSearched] = useState("");

  const getdyanmicId = () => {
    let location = window.location.href.split("/");
    let id = location[location.length - 1];
    return id;
  };

  let id = getdyanmicId();

  useEffect(() => {
    loadUser();

    getAllDetails(id);

    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);
  const openpopup = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setSubValue({ ...subValue, [e.target.name]: e.target.value });
  };

  const onSearchChange = (e) => {
    setSearched(([e.target.name] = e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addPoint(subValue, id);
    // subjectContext.addSubject(subValue);
    setSubValue({
      context: ``,
      code: ``,
      description: ``,
    });
    setOpen(false);
  };

  return (
    <div>
      <div className="buttonPosition">
        <TextField
          id="filled-search"
          fullWidth={true}
          placeholder="Search by context"
          type="search"
          name="search"
          value={search}
          onChange={onSearchChange}
          variant="outlined"
        />

        {/* <input classname="inputStyle" type='search' /> */}

        <AddIcon
          onClick={openpopup}
          titleAccess="Add New Point"
          variant="outlined"
        />
      </div>

      <div className="detailsContainer">
        {isAuthenticate == null && loading ? (
          <SpinnerRoundOutlined />
        ) : details.length == 0 ? (
          "No Recrod Found!"
        ) : (
          details.map((detail, index) => {
            let _id = detail._id;
            let context = detail.context;

            if (!context.toLowerCase().includes(search.trim().toLowerCase())) {
              if (details.length == index + 1) {
                if (x.length == 0) {
                  return "No Recrod Found!";
                }
              }
            } else {
              x.push(detail);
              return <DetailItem key={_id} detail={detail} />;
            }
          })
        )}
      </div>

      <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create New Point"}</DialogTitle>
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
                Save
              </Button>
              <Button onClick={handleClose} variant="outlined" color="error">
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default Details;
