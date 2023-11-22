"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TournamentForm from "@/components/TournamentForm";

function EditTournament() {
  const { id } = useParams();
  const { data: session } = useSession({
    required: true,
  });

  const tournament_id_to_edit = id;

  if (session?.user.id && session?.user.role !== "ADMIN") {
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

  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              width: 500,
            }}
          >
            <Typography
              sx={{
                pt: 8,
                color: "black",
                fontWeight: 600,
                fontSize: 30,
              }}
              align="center"
            >
              Edit tournament form
            </Typography>
            <Typography
              sx={{
                color: "black",
              }}
              align="center"
            >
              Click on the inputs to see the old data on the corresponding
              field, <b>only fill what you want to change</b>, and after that
              click on EDIT TOURNAMENT.
            </Typography>
          </Box>
          <TournamentForm tournament_id_to_edit={tournament_id_to_edit} />
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

export default EditTournament;
