import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HeroHomePage from "@/components/HeroHomePage";
import TournamentCard from "@/components/TournamentCard";

import { get_tournaments } from "@/services/tournaments";

async function AdminHome() {
  const fetch_tournaments = await get_tournaments();

  return (
    <>
      <Navbar />
      <main>
        <HeroHomePage />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {fetch_tournaments?.tournaments?.map((tournament) => (
              <TournamentCard
                key={tournament._id}
                _id={tournament._id}
                name={tournament.name}
                city={tournament.city}
                tennis_court={tournament.tennis_court}
                registered_contestants={tournament.registered_contestants}
                max_contestants={tournament.max_contestants}
                inscription_price={tournament.inscription_price}
                beggining_date={tournament.beggining_date}
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
