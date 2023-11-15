import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TournamentCardButtons from "@/components/TournamentCardButtons/index";

function TournamentCard({
  _id,
  name,
  city,
  tennis_court,
  registered_contestants,
  max_contestants,
  inscryption_price,
  beggining_date,
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
          <p>
            <span style={{ fontWeight: "bolder" }}>Inscryption price: </span>
            {inscryption_price}
          </p>
          <p>
            <span style={{ fontWeight: "bolder" }}>Beggining date: </span>
            {new Date(beggining_date).toDateString()}
          </p>
        </CardContent>
        <TournamentCardButtons _id={_id} />
      </Card>
    </Grid>
  );
}

export default TournamentCard;
