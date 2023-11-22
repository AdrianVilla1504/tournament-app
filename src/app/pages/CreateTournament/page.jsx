"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Navbar from "@/components/Navbar";
import Typography from "@mui/material/Typography";
import TournamentForm from "@/components/TournamentForm";

function CreateTournament() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });

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
              Create tournament form
            </Typography>
            <Typography
              sx={{
                color: "black",
              }}
              align="center"
            >
              Fill <b>all the inputs provided</b> to create a new tournament.
            </Typography>
          </Box>
          <TournamentForm />
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

export default CreateTournament;
