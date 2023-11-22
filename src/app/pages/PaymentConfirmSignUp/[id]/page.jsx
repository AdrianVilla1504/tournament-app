"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Navbar from "@/components/Navbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { get_tournament_by_id } from "@/services/tournaments";
import {
  create_new_inscription,
  validate_existing_inscription,
} from "@/services/inscriptions";

function PaymentConfirmSignUp() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });
  const [existing_tournament, set_existing_tournament] = useState({});

  const tournament_id_to_inscription = id;

  useEffect(() => {
    const tournament = async () => {
      await get_tournament_by_id(tournament_id_to_inscription).then(
        (response) => {
          set_existing_tournament(response);
        }
      );
    };

    if (tournament_id_to_inscription) tournament();
  }, [tournament_id_to_inscription]);

  if (session?.user.id && session?.user.role !== "USER") {
    return (
      <>
        <Navbar />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 20,
              pb: 20,
              height: "200px",
            }}
          >
            <Typography variant="h1" align="center" color="black" gutterBottom>
              Unauthorized
            </Typography>
          </Box>
        </main>
      </>
    );
  }

  const handle_create_inscription = async () => {
    const new_inscription = {
      tournament_id: tournament_id_to_inscription,
      user_id: session?.user.id,
      signup_cost: existing_tournament.inscription_price,
      status_payment: "PAID",
    };
    try {
      const existing_inscription = await validate_existing_inscription(
        session?.user.id,
        tournament_id_to_inscription
      );
      if (existing_inscription) {
        alert(
          `You are signed up already to "${existing_tournament.name}" tournament already.`
        );
        return router.push("/");
      }
    } catch (error) {
      alert("Error searching existing tournament");
      return console.error(error);
    }

    try {
      const response = await create_new_inscription(new_inscription);
      if (response.success) {
        alert(`Success sign up to ${existing_tournament.name}`);
        return router.push("/");
      } else {
        alert(`Sign up error`);
        return console.error(String(response));
      }
    } catch (error) {
      alert(`Sign up error`);
      return console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 20,
            pb: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" align="center" color="black" gutterBottom>
            Confirm Sign up to tournament{" "}
            <div>
              <span style={{ fontWeight: "bolder" }}>Tournament name:</span>{" "}
              <span>{existing_tournament.name}</span>
            </div>
            <div>
              <span style={{ fontWeight: "bolder" }}>
                Tournament beggining date:
              </span>{" "}
              <span>{existing_tournament.beggining_date}</span>
            </div>
            <span style={{ fontWeight: "bolder" }}>Inscription Price:</span>{" "}
            <span>{existing_tournament.inscription_price} USD</span>
            <div></div>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <Button>Return home</Button>
            </Link>
            <Button onClick={handle_create_inscription}>Sign up</Button>
          </Box>
        </Box>
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

export default PaymentConfirmSignUp;
