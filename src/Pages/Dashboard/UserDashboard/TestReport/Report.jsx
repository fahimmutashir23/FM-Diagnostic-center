import {
  Box,
  Button,
  Grid,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import logo from "../../../../assets/image/logo/FM DIAGNOSTIC.png";
import moment from "moment/moment";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPrint from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Utils/Loading/Loading";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

const Report = () => {
  const { testName } = useParams();
  const ref = useRef();
  const date = moment().format("DD-MM-YYYY");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: report = [], isPending } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/testResult?email=${user?.email}&testName=${testName}`
      );
      return res.data;
    },
  });
  if (isPending) {
    return <Loading color="black" height="40" width="40"></Loading>;
  }

  return (
    <Grid sx={{ maxWidth: "800px", mx: "auto" }}>
      <PageTitle title='Test Report'></PageTitle>
      <Box component={Paper} sx={{ display: "block", p: 3, my: 1 }}>
        <Box ref={ref}>
          <ImageListItem component={"div"} sx={{ width: "100px" }}>
            <img src={logo} alt="logo" />
          </ImageListItem>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              mt: 2,
            }}
          >
            Your Test Result Here
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              mt: 2,
            }}
          >
            {testName}
          </Typography>
          <Typography>date : {date}</Typography>
          {report.map((item) => (
            <Grid key={item._id} sx={{mt: 3,}}>
                <Typography>Patient Name : <strong>{item.name}</strong></Typography>
                <Typography sx={{width: '100px'}}>Full Report : <strong>{item.testDetails.details}</strong></Typography>
            </Grid>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
        <ReactPrint
          trigger={() => <Button variant="contained">Print Result</Button>}
          content={() => ref.current}
        ></ReactPrint>
      </Box>
    </Grid>
  );
};

export default Report;
