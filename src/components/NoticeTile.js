// import React from "react";
// import { Grid, Paper, Typography } from "@mui/material";
// import styled from "styled-components";

// const StyledPaper = styled(Paper)`
//   padding: 16px;
//   margin: 12px;
//   display: flex;
//   flex-direction: column;
//   min-height: 150px;
//   justify-content: space-around;
//   align-items: center;
//   text-align: center;
//   backgroundColor : rgba(210, 130, 252,0.8)
//   cursor: pointer;
//   border: 1px solid #ddd;
//   border-radius: 8px;

//   &:hover {
//     box-shadow: 10px 10px 20px 2px rgba(0,0,0,0.37);
//     border-radius: 12px;
//     transition: background 0.8s ease, border-radius 0.8s ease, border 0.5s ease;
//   }
// `;

// const StyledTitle = styled.div`
//   font-weight: bold;
//   ${"" /* color: #3498db; */}
//   color:#b932ff;
//   font-size: 1.3em;
// `;

// const StyledDate = styled.div`
//   position: absolute;
//   top: 4px;
//   left: 10px;
//   font-size: 0.8em;
//   color: grey;
//   font-style: italic;
// `;

// const StyledRemainingDate = styled.div`
//   position: absolute;
//   bottom: 4px;
//   left: 10px;
//   color: grey;
// `;

// const calculateRemainingDays = (dateString) => {
//   const currentDate = new Date();
//   const eventDate = new Date(dateString);
//   if (isNaN(eventDate.getTime())) {
//     return "Invalid Date";
//   }
//   const timeDifference = eventDate.getTime() - currentDate.getTime();
//   const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
//   return daysDifference >= 0 ? `${daysDifference} days remaining` : "Expired";
// };

// const NoticeTile = ({ title, details, date, ButtonHaver }) => {
//   return (
//     <Grid item xs={12} md={4} lg={3}>
//       <StyledPaper>
//         {/* <Typography variant="h6">{title}</Typography> */}
//         <StyledTitle>{title}</StyledTitle>

//         <Typography>{details}</Typography>
//         <Typography>{calculateRemainingDays(date)}</Typography>
//         {/* <StyledRemainingDate>{calculateRemainingDays(date)}</StyledRemainingDate> */}

//         {/* <Typography className="StyledDate">{date}</Typography> */}
//         <StyledDate> {date} </StyledDate>
//         {/* {ButtonHaver && <div style={{ marginTop: "8px" }}>{ButtonHaver()}</div>} */}
//         {/* <ButtonHaver row={rows} /> */}
//       </StyledPaper>
//     </Grid>
//   );
// };

// export default NoticeTile;

import React, { useState } from "react";
import { Badge, Grid, Paper, TablePagination, Typography } from "@mui/material";
import styled from "styled-components";
import LabelIcon from "@mui/icons-material/Label";
// import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";

const StyledPaper = styled(Paper)`
  position: relative;
  padding: 12px;
  margin: 8px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #fff, #eee);
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  // transition: background 0.5s ease, border-radius 0.3s ease;

  > div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &::before {
    content: "${({ date }) => {
      const targetDate = new Date(date);
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
    }}";
    ${
      "" /*
      const formattedTargetDate = targetDate.toLocaleDateString();
      const formattedCurrentDate = currentDate.toLocaleDateString();
      const formattedTomorrow = tomorrow.toLocaleDateString();
      if (formattedTargetDate === formattedCurrentDate) {
        return "Today";
      } else if (targetDate < currentDate) {
        return "Expired";
      } else if (formattedTargetDate === formattedTomorrow) {
        return "Tomorrow";
      } else {
        // Calculate the difference in days
        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const daysDifference = Math.ceil(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        return `In ${daysDifference} days`;
      } */
    }

    font-weight: bold;
    position: absolute;
    bottom: 10px;
    left: -8px;
    align-items: center;
    text-align: center;
    ${
      "" /* background-color: ${({ date }) => {
      const targetDate = new Date(date);
      const currentDate = new Date();

      return targetDate < currentDate ? "red" : "green";
    }}; */
    }
    color: white;
    padding: 8px;
    height: 30px;
    font-size: 0.7em;
    // width: 80px;
    border-radius: 8px;
    // transform: rotate(320deg);
    transform-origin: 0% 0%;
  }

  &:hover {
    ${"" /* background: linear-gradient(to bottom, #fff, #e1e1e1); */}
    box-shadow: 10px 10px 20px 2px rgba(0,0,0,0.37);
    border-radius: 12px;
    transition: background 0.5s ease, border-radius 0.3s ease;

    > div {
      max-height: none;
      -webkit-line-clamp: 10;
      // font-size: 0.95rem;
    }
  }

  transition: background 0.5s ease, border-radius 0.3s ease;
`;

const calculateRemainingDays = (dateString) => {
  const currentDate = new Date();
  const eventDate = new Date(dateString);

  if (isNaN(eventDate.getTime())) {
    return "Invalid Date";
  }

  const timeDifference = eventDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference >= 0 ? `${daysDifference} days remaining` : "Expired";
};

const StyledTitle = styled.div`
  font-weight: bold;
  ${"" /* color: #3498db; */}
  color:#b932ff;
  font-size: 1.3em;
`;

const StyledDate = styled.div`
  position: absolute;
  top: 4px;
  left: 10px;
  font-size: 0.8em;
  color: grey;
  font-style: italic;
`;

const RemainingD = styled.div`
  position: absolute;
  bottom: 4px;
  left: 10px;
  color: grey;
`;

const DetailInfo = styled.div`
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
`;

const ShowMoreLink = styled.span`
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledButtonHaver = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  padding: 0px 3px;
  ${"" /* background-color: #3498db; */}
  background-color:#b932ff;
  border-radius: 30px 0 4px 0px;
  transition: background-color 0.5s ease, border-radius 0.3s ease;

  &:hover {
    border-radius: 20px 0 8px 0px;
    background-color: red;
  }
`;

const formatDate = (dateString) => {
  // Check if the dateString is a valid date
  const isValidDate = !isNaN(new Date(dateString).getTime());
  if (isValidDate) {
    // If the date is valid, format it
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  } else {
    // If the date is invalid, return a default message
    return "Invalid Date";
  }
};

const NoticeTile = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  return (
    <>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <StyledPaper>
                {columns.map((column, index) => {
                  const value = row[column.id];
                  return (
                    <div key={column.id} align={column.align}>
                      {column.id === "title" ? (
                        <StyledTitle>{value}</StyledTitle>
                      ) : column.id === "date" && typeof value === "string" ? (
                        <>
                          <StyledDate>{formatDate(value)}</StyledDate>
                          <RemainingD>
                            {calculateRemainingDays(value)}
                          </RemainingD>
                        </>
                      ) : (
                        <DetailInfo>{value}</DetailInfo>
                      )}
                    </div>
                  );
                })}
              </StyledPaper>
            </Grid>
          );
        })}
      <TablePagination
        labelRowsPerPage={'Cards per page'}
        style={{ display: "flex", justifyContent: "flex-end" }}
        // rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        // onRowsPerPageChange={(event) => {
        //   setRowsPerPage(parseInt(event.target.value, 5));
        //   setPage(0);
        // }}
      />
    </>
  );
};

export default NoticeTile;
