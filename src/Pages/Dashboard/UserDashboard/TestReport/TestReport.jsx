import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, ImageListItem, Typography } from "@mui/material";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Utils/Loading/Loading";
import ReactPrint from "react-to-print";
import { useRef } from "react";
import logo from "../../../../assets/image/logo/FM DIAGNOSTIC.png";
import moment from "moment/moment";

const TestReport = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const ref = useRef();
  const date = moment().format('DD-MM-YYYY')

  const { data: testResult = [], isPending } = useQuery({
    queryKey: ["testResult"],
    queryFn: async () => {
      const res = await axiosPublic(`/testResult?email=${user?.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading color="black"></Loading>;
  }

  return (
    <TableContainer component={Paper}>
      <SectionTitle title="Test Result"></SectionTitle>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Test Name
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {testResult.map((test, idx) => (
            <TableRow
              key={test._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" sx={{ fontSize: "1.5rem" }}>
                {idx + 1}. {test.testName}
              </TableCell>
              <TableCell align="right">
                <ReactPrint
                  trigger={() => (
                    <Button variant="contained">Print Result</Button>
                  )}
                  content={() => ref.current}
                ></ReactPrint>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box  sx={{ display: "none" }}>
        <Box ref={ref}>
          <ImageListItem component={"div"} sx={{ width: "200px" }}>
            <img src={logo} alt="logo" />
          </ImageListItem>
          <Typography sx={{
            fontSize: '1.5rem',
            fontWeight: "bold",
            textAlign: 'center',
            mt: 4
          }}>Your Test Result Here</Typography>
          <Typography>date : {date}</Typography>
        </Box>
      </Box>
    </TableContainer>
  );
};

export default TestReport;
