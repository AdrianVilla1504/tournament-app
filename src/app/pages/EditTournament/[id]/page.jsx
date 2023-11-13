"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "@/components/Navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TournamentForm from "@/components/TournamentForm";

function EditTournament() {
  const user = {
    _id: 2,
    name: "nathan",
    email: "nathan@gmail.com",
    role: "ADMIN",
  };
  const { id } = useParams();

  const tournament_id_to_edit = id;

  return (
    <>
      <Navbar role={user.role} />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
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
