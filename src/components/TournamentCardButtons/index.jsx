"use client";
import { useRouter } from "next/navigation";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { delete_tournaments } from "@/services/tournaments";

function TournamentCardButtons({ _id, role }) {
  const router = useRouter();

  const sing_up_tournament = () => {
    router.push("/");
  };

  const edit_tournament = (id) => {
    router.push(`/pages/EditTournament/${id}`);
  };

  const delete_tournament = async () => {
    const response = await delete_tournaments({ ids_to_delete: [_id] });
    if (response.success) router.push("/pages/AdminHome");
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
          <Button size="small" onClick={() => delete_tournament()}>
            Delete
          </Button>
        </>
      )}
    </CardActions>
  );
}

export default TournamentCardButtons;
