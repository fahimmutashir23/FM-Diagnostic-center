import { Box, Button, Grid } from "@mui/material";
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

const AllTestPage = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const [status, setStatus] = useState('');
  const todayDate = moment().format("YYYY-MM-DD");

  axiosPublic(`/users?email=${user?.email}`)
  .then(res => {setStatus(res.data[0].active_status)})

  const { data = [], isPending, refetch } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic(`/tests`);
      const currentData = res.data.filter(item => item.date > todayDate)
      return currentData;
    },
  });

  if (isPending) {
    return <Loading color="black"></Loading>;
  }
  refetch()

  return (
    <Box>
      <SectionTitle title="All Test"></SectionTitle>

      <Grid container sx={{ margin: "10px 0px" }}>
        {data.map((test) => (
          <Grid key={test._id} item sm={12} md={4}>
            <Card sx={{ backgroundColor: "#A6F6FF", m: 1}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={test.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{height: "60px"}}>
                    {test.test_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{height: "60px", margin: '5px 0px'}}>
                    {test.details}
                  </Typography>
                  <Typography sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px', fontWeight: 'bold'}}>
                    Test rate : ${test.price} 
                    {status === 'active' ? <Link to={`/details/${test._id}`}><Button variant="contained">Details</Button></Link> : <Link to={`/details/${test._id}`}><Button  variant="contained">Details</Button></Link>}
                  </Typography>
                </CardContent>
              </CardActionArea>    
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllTestPage;
