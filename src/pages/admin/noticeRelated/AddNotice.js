// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addStuff } from "../../../redux/userRelated/userHandle";
// import { underControl } from "../../../redux/userRelated/userSlice";
// import { CircularProgress } from "@mui/material";
// import Popup from "../../../components/Popup";

// const AddNotice = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, response, error } = useSelector((state) => state.user);
//   const { currentUser } = useSelector((state) => state.user);

//   const [title, setTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [date, setDate] = useState("");
//   const adminID = currentUser._id;

//   const [loader, setLoader] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [message, setMessage] = useState("");

//   const fields = { title, details, date, adminID };
//   const address = "Notice";

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setLoader(true);
//     dispatch(addStuff(fields, address));
//   };

//   useEffect(() => {
//     if (status === "added") {
//       navigate("/Admin/notices");
//       dispatch(underControl());
//     } else if (status === "error") {
//       setMessage("Network Error");
//       setShowPopup(true);
//       setLoader(false);
//     }
//   }, [status, navigate, error, response, dispatch]);

//   return (
//     <>
//       <div className="register">
//         <h2 className="registerTitle">Add Notice</h2>
//         <form className="registerForm" onSubmit={submitHandler}>
//           <label>Title</label>
//           <input
//             className="registerInput"
//             type="text"
//             placeholder="Enter notice title..."
//             value={title}
//             onChange={(event) => setTitle(event.target.value)}
//             required
//             style={{ height: "40px", width: "400px", margin: "20px" }}
//           />
//           <br />
//           {/* <input
//             className="registerInput"
//             type="text"
//             placeholder="Enter notice details..."
//             value={details}
//             onChange={(event) => setDetails(event.target.value)}
//             required
//             style={{ height: "150px",width:'500px', margin: "20px" }}
//           /> */}
//           <label>Details</label> <br />
//           <textarea
//             className="registerInput"
//             type="text"
//             placeholder="Enter notice details..."
//             value={details}
//             onChange={(event) => setDetails(event.target.value)}
//             required
//             name=""
//             id=""
//             cols="50"
//             rows="10"
//             style={{ margin: "20px" }}
//           ></textarea>
//           <br />
//           <label>Date</label>
//           <input
//             className="registerInput"
//             type="date"
//             placeholder="Enter notice date..."
//             value={date}
//             onChange={(event) => setDate(event.target.value)}
//             required
//             style={{ margin: "20px", height: "4vh", width: "10vw" }}
//           />
//           <br />
//           <button className="registerButton" type="submit" disabled={loader}>
//             {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
//           </button>
//         </form>
//       </div>
//       <Popup
//         message={message}
//         setShowPopup={setShowPopup}
//         showPopup={showPopup}
//       />
//     </>
//   );
// };

// export default AddNotice;
















import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  Box,
  Typography,
  Paper,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/notices");
      dispatch(underControl());
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <Paper style={{ margin: "20px" }}>
          <form
            onSubmit={submitHandler}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Box mb={2} mt={2}>
              <Typography variant="h5">Add Notice</Typography>
            </Box>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
              <Grid item md={6} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Grid>
              <Grid item md={3} sm={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </Grid>
              <Grid item md={9} sm={9} xs={9}>
                <TextField
                  fullWidth
                  multiline
                  label="Details"
                  variant="outlined"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} m={2}>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loader}
                  >
                    {loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddNotice;
