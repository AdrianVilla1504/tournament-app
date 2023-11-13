"use client";
import { useRouter } from "next/navigation";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function TournamentCardButtons({ role }) {
  const router = useRouter();
  const sing_up_tournament = () => {
    router.push("/");
  };
  const create_tournament = () => {
    router.push("/pages/CreateTournament");
  };
  return (
    <CardActions>
      {role === "USER" ? (
        <Button size="small" onClick={() => sing_up_tournament()}>
          Sing up
        </Button>
      ) : (
        <>
          <Button size="small" onClick={() => create_tournament()}>
            Edit
          </Button>
          <Button size="small" onClick={() => sing_up_tournament()}>
            Delete
          </Button>
        </>
      )}
    </CardActions>
  );
}

export default TournamentCardButtons;
