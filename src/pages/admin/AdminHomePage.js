import { Container, Grid, Paper } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
// import Fees from "../../assets/img4.png";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle";
import { getAllStudents } from "../../redux/studentRelated/studentHandle";
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);

  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StyledPaper
              onClick={() => navigate(`/Admin/students`)}
              sx={{
                "@media (max-width: 500px)": {
                  flexDirection: "column",
                },
              }}
              style={{ backgroundColor: "#b932ff" }}
            >
              <img src={Students} alt="Students" />
              <Title style={{ color: "white" }}>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <StyledPaper
              onClick={() => navigate(`/Admin/classes`)}
              sx={{
                "@media (max-width: 500px)": {
                  flexDirection: "column",
                },
              }}
              style={{ backgroundColor: "#b932ff" }}
            >
              <img src={Classes} alt="Classes" />
              <Title style={{ color: "white" }}>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <StyledPaper
              onClick={() => navigate(`/Admin/teachers`)}
              style={{ backgroundColor: "#b932ff" }}
              sx={{
                "@media(max-width:500px)" : {
                  flexDirection:"column"
                }
              }}
            >
              <img src={Teachers} alt="Teachers" />
              <Title style={{ color: "white" }}>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          
          <Grid item xs={12} md={12} lg={12}>
            {/* <div sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </div> */}
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", marginTop:'10px' }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  min-height: 140px;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  ${
    "" /* background: linear-gradient(0deg, rgba(4,0,0,1) 0%, rgba(102,74,159,1) 20%, rgb(173, 30, 250) 49%, rgba(82,62,124,1) 82%, rgba(4,0,0,1) 100%); */
  }
  cursor: pointer;

  &:hover {
    ${"" /* background: linear-gradient(to bottom, #b4ffee, #03ffc5);  */}
    ${
      "" /* background: linear-gradient(180deg, rgba(113,57,233,1) 28%, rgba(206,194,230,1) 100%); */
    }
    ${
      "" /* background: linear-gradient(0deg, rgba(4,0,0,1) 0%, rgba(105,77,163,1) 15%, rgb(191, 80, 251) 45%, rgba(82,62,124,1) 87%, rgba(2,0,6,1) 100%); */
    }

    border-radius: 15px;
    ${"" /* border: 1px solid black; */}
    transition: background 0.8s ease, border-radius 0.6s ease, border 0.6s ease;
    -webkit-box-shadow: 21px 21px 38px -20px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 21px 21px 38px -20px rgba(0, 0, 0, 0.75);
    box-shadow: 21px 21px 38px -20px rgba(0, 0, 0, 0.75);
    
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(2.6rem + 0.6vw);
  ${"" /* color: #088f8f; */}
  color:white;
`;

export default AdminHomePage;
