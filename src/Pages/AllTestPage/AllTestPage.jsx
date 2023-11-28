import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
} from "@mui/material";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Utils/Loading/Loading";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import moment from "moment/moment";
import { MenuOutlined, Search } from "@mui/icons-material";
import PageTitle from "../../Utils/PageTitle/PageTitle";

const AllTestPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const todayDate = moment().format("YYYY-MM-DD");
  const [search, setSearch] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(0);

  const totalPage = Math.ceil(parseInt(totalData) / 6);
  const paginateBtn = [...Array(totalPage).keys()];

  axiosPublic("/totalTests").then((res) => setTotalData(res.data.count));

  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  axiosPublic(`/users?email=${user?.email}`).then((res) => {
    setStatus(res.data[0]?.active_status);
  });

  const {
    data = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic(`/tests?search=${search}&page=${page}`);
      const currentData = res.data.filter((item) => item.date > todayDate);
      return currentData;
    },
  });

  if (isPending) {
    return <Loading color="black"></Loading>;
  }
  refetch();

  const handleSearch = (e) => {
    e.preventDefault();
    const result = e.target.search.value;
    setSearch(result);
    e.target.reset();
  };

  return (
    <Box>
      <PageTitle title='All Test'></PageTitle>
      <SectionTitle title="All Test"></SectionTitle>

      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 400,
          mx: "auto",
          mt: 5,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuOutlined />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Test"
          name="search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="submit"
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <Search />
        </IconButton>
      </Paper>

      <Grid container sx={{ margin: "10px 0px" }}>
        {data.map((test) => (
          <Grid key={test._id} item sm={12} md={4}>
            <Card sx={{ backgroundColor: "#A6F6FF", m: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={test.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ height: "60px" }}
                  >
                    {test.test_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ height: "60px", margin: "5px 0px" }}
                  >
                    {test.details}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Test rate : ${test.price}
                    {status === "active" ? (
                      <Link to={`/details/${test._id}`}>
                        <Button variant="contained">Details</Button>
                      </Link>
                    ) : (
                      <Link to={`/details/${test._id}`}>
                        <Button disabled variant="contained">
                          Details
                        </Button>
                      </Link>
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box component={'div'} sx={{display: 'flex', justifyContent: 'center', my: 4}}>
      <Pagination shape="rounded" variant="outlined" count={paginateBtn.length} page={page + 1} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default AllTestPage;
