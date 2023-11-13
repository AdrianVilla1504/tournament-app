"use client";
import { useRouter } from "next/navigation";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function TournamentCardButtons({ _id, role }) {
  const router = useRouter();
  const sing_up_tournament = () => {
    router.push("/");
  };
  const create_tournament = () => {
    router.push("/pages/CreateTournament");
  };
  const edit_tournament = (id) => {
    router.push(`/pages/EditTournament/${id}`);
  };
  return (
    <CardActions>
      {role === "USER" ? (
        <Button size="small" onClick={() => sing_up_tournament()}>
          Sing up
        </Button>
      ) : (
        <>
          <Button size="small" onClick={() => edit_tournament(_id)}>
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
