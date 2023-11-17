import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TournamentCardButtons from "@/components/TournamentCardButtons/index";

function UserCard({ fullname, email }) {
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
            <span style={{ fontWeight: "bolder" }}>Fullname: {fullname}</span>
          </Typography>

          <p>
            <span style={{ fontWeight: "bolder" }}>email: </span>
            {email}
          </p>
        </CardContent>
        <TournamentCardButtons _id={_id} />
      </Card>
    </Grid>
  );
}

export default UserCard;
