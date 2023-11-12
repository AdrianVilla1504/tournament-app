import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { get_tournaments } from "@/services/tournaments";
import SingUpTournamentButton from "@/components/SignUpTournamentButton/index";
import HeroHomePage from "@/components/HeroHomePage";

async function HomePage() {
  const tournaments = await get_tournaments();
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <HeroHomePage />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {tournaments.map((tournament) => (
              <Grid item key={tournament._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      <span style={{ fontWeight: "bolder" }}>
                        {tournament.name}
                      </span>
                    </Typography>

                    <p>
                      <span style={{ fontWeight: "bolder" }}>City: </span>
                      {tournament.city}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        Tennis court:{" "}
                      </span>
                      {tournament.tennis_court}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        Registered contestants:{" "}
                      </span>
                      {tournament.registered_contestants}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bolder" }}>
                        Maximum contestans:{" "}
                      </span>
                      {tournament.max_contestants}
                    </p>
                  </CardContent>
                  <SingUpTournamentButton tournament={tournament} />
                </Card>
              </Grid>
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

export default HomePage;
