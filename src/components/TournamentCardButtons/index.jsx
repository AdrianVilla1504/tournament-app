"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { delete_tournaments } from "@/services/tournaments";

function TournamentCardButtons({ _id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const sing_up_tournament = (id) => {
    if (session?.user.id) {
      router.push(`/pages/PaymentConfirmSignUp/${id}`);
    } else {
      router.push(`/api/auth/signin`);
    }
  };

  const edit_tournament = (id) => {
    router.push(`/pages/EditTournament/${id}`);
  };

  const delete_tournament = async () => {
    const response = await delete_tournaments({ ids_to_delete: [_id] });
    if (response.success) router.push("/pages/AdminHome");
  };

  return (
    <>
      <CardActions>
        {session?.user.role !== "ADMIN" ? (
          <Button size="small" onClick={() => sing_up_tournament(_id)}>
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
    </>
  );
}

export default TournamentCardButtons;
