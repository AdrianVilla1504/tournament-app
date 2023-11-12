import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { get_tournaments } from "@/services/tournaments";
import HeroHomePage from "@/components/HeroHomePage";
import TournamentCard from "@/components/TournamentCard";
import Navbar from "@/components/Navbar";

async function AdminHome() {
  const user = {
    _id: 2,
    name: "nathan",
    email: "nathan@gmail.com",
    role: "ADMIN",
  };

  const tournaments = await get_tournaments();

  return (
    <>
      <Navbar role={user.role} />
      <main>
        <HeroHomePage />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {tournaments.map((tournament) => (
              <TournamentCard
                key={tournament._id}
                _id={tournament._id}
                name={tournament.name}
                city={tournament.city}
                tennis_court={tournament.tennis_court}
                registered_contestants={tournament.registered_contestants}
                max_contestants={tournament.max_contestants}
              />
            ))}
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

export default AdminHome;
