import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeroHomePage from "@/components/HeroHomePage";
import UserCard from "@/components/UserCard";
import { get_users } from "@/services/users";

async function Users() {
  const fetch_users = await get_users();
  if (fetch_users?.auth_error) {
    return (
      <>
        <Navbar />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 20,
              pb: 20,
              height: "200px",
            }}
          >
            <Typography variant="h1" align="center" color="black" gutterBottom>
              Unauthorized
            </Typography>
          </Box>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroHomePage />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {fetch_users?.users?.map((user) => {
              return (
                <UserCard
                  key={user._id}
                  _id={user._id}
                  fullname={user.fullname}
                  email={user.email}
                />
              );
            })}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
      </Box>
    </>
  );
}

export default Users;
