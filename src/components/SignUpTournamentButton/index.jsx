"use client";
import { useRouter } from "next/navigation";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

function SignUpTournamentButton() {
  const router = useRouter();
  const sing_up_tournament = () => {
    router.push("/");
  };
  return (
    <CardActions>
      <Button size="small" onClick={() => sing_up_tournament()}>
        Sing up
      </Button>
    </CardActions>
  );
}

export default SignUpTournamentButton;
