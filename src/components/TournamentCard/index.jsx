import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SingUpTournamentButton from "@/components/SignUpTournamentButton/index";

function TournamentCard({
  _id,
  name,
  city,
  tennis_court,
  registered_contestants,
  max_contestants,
  role,
}) {
  return (
    <Grid item key={_id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            <span style={{ fontWeight: "bolder" }}>{name}</span>
          </Typography>

          <p>
            <span style={{ fontWeight: "bolder" }}>City: </span>
            {city}
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>Tennis court: </span>
            {tennis_court}
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>
              Registered contestants:{" "}
            </span>
            {registered_contestants}
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>Maximum contestans: </span>
            {max_contestants}
          </p>
        </CardContent>
        <SingUpTournamentButton /* tournament={tournament} */ />
      </Card>
    </Grid>
  );
}

export default TournamentCard;
