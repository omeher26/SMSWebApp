import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotices } from "../redux/noticeRelated/noticeHandle";
import NoticeTile from "./NoticeTile";
import { Box, Container, Grid, TablePagination } from "@mui/material";

const SeeNotice = () => {
  const dispatch = useDispatch();

  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  useEffect(() => {
    if (currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    }
  }, [dispatch, currentRole, currentUser]);

  if (error) {
    console.log(error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 120 },
    { id: "details", label: "Details", minWidth: 150},
    {id: "date",  label: "Date",  minWidth: 170,  align: "center"},
  ];

  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        title: notice.title,
        details: notice.details,
        date: dateString,
        id: notice._id,
      };
    });

  const sortedNoticeRows =
    noticeRows && noticeRows.length > 0
      ? noticeRows.slice().sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          const currentDate = new Date();

          // Check if notices are today
          const isTodayA = dateA.toDateString() === currentDate.toDateString();
          const isTodayB = dateB.toDateString() === currentDate.toDateString();

          // Check if notices are tomorrow
          const isTomorrowA =
            new Date(dateA.getTime() + 86400000).toDateString() ===
            new Date(currentDate.getTime() + 86400000).toDateString();
          const isTomorrowB =
            new Date(dateB.getTime() + 86400000).toDateString() ===
            new Date(currentDate.getTime() + 86400000).toDateString();

          // Check if notices are expired
          const isExpiredA = dateA < currentDate;
          const isExpiredB = dateB < currentDate;

          // Sort by Today, Tomorrow, Upcoming, and then Expired
          if (isTodayA && !isTodayB) return -1;
          if (!isTodayA && isTodayB) return 1;

          if (isTomorrowA && !isTomorrowB) return -1;
          if (!isTomorrowA && isTomorrowB) return 1;

          if (!isExpiredA && isExpiredB) return -1;
          if (isExpiredA && !isExpiredB) return 1;

          // If both are in the same category, sort by date
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;

          return 0;
        })
      : [];

  return (
    <>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                marginBottom: "20px",
                fontSize: "30px",
                borderBottom: "2px solid #000",
              }}
            >
              Notices & Events
            </Box>
            {/* {Array.isArray(noticesList) && noticesList.length > 0 && (
            <>
              {noticesList.map((notice) => (
                <NoticeTile
                key={notice._id}
                title={notice.title}
                details={notice.details}
                date={new Date(notice.date).toISOString().substring(0, 10)}
                />
              ))}
            </>
            )} */}

            {/* <Box sx={{ width: "100%", overflow: "hidden" }}> */}
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                {Array.isArray(sortedNoticeRows) &&
                  sortedNoticeRows.length > 0 && (
                    <NoticeTile
                      // buttonHaver={NoticeButtonHaver}
                      columns={noticeColumns}
                      rows={sortedNoticeRows}
                    />
                  )}
              </Grid>
            </Box>

            
          </Container>
        </>
      )}
    </>
  );
};

export default SeeNotice;
