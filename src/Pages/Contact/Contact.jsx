import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import contactLogo from "../../assets/image/doctor-vector.png";
import { useState } from "react";
import Loading from "../../Utils/Loading/Loading";
import PageTitle from "../../Utils/PageTitle/PageTitle";

const Contact = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)



        setLoading(false)
    }
  return (
    <Grid component={Paper} sx={{my: 2}}>
      <PageTitle title='Contact'></PageTitle>
      <SectionTitle title="Contact With Us"></SectionTitle>
      <Grid container>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center", my: 6 }}
        >
          <img src={contactLogo} alt="" style={{ width: "40%" }} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { mt: 4 },
            }}
          >
            <Grid container spacing={2} sx={{ p: 1 }}>
              <Grid item sm={12}>
                <TextField required fullWidth label="Your Name" name="name" />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Opinion"
                  name="description"
                  multiline
                  maxRows={10}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <Loading color="#fafdfb" height="25" width="25"></Loading>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
