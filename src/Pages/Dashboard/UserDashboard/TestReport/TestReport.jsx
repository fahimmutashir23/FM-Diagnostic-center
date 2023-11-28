import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Utils/Loading/Loading";
import { Link } from "react-router-dom";
import PageTitle from "../../../../Utils/PageTitle/PageTitle";

const TestReport = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: testResult = [], isPending } = useQuery({
    queryKey: ["testResult"],
    queryFn: async () => {
      const res = await axiosPublic(`/testResult?email=${user?.email}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading color="black" height='40' width='40'></Loading>;
  }

  return (
    <TableContainer component={Paper}>
      <PageTitle title='Test Report'></PageTitle>
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
                <Link to={`/report/${test.testName}`}><Button variant="contained">View Report</Button></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestReport;
