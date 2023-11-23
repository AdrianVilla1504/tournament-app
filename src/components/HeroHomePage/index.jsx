"use client";
import { useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function HeroHomePage() {
  const { data: session } = useSession();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {session?.user?.role !== "ADMIN" || !session
            ? "Tournament App"
            : "Tournament App Admin panel"}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {session?.user?.role !== "ADMIN" || !session
            ? "Your favorite website for searching and enrol to tennis tournaments."
            : "Welcome to Tournament App admin panel."}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
    </Box>
  );
}

export default HeroHomePage;
