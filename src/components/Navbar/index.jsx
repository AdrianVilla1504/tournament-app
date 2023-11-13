"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

function Navbar({ role }) {
  const router = useRouter();
  const create_tournament = () => {
    router.push("/pages/CreateTournament");
  };
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SportsTennisIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tournament App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <SportsTennisIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {role === "ADMIN" ? (
                <Button
                  onClick={() => create_tournament()}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Create new tournament
                </Button>
              ) : (
                <></>
              )}
            </Box>

            <Box sx={{ display: "flex" }}>
              {role === "USER" ? (
                <>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Login
                  </Button>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Register
                  </Button>
                </>
              ) : (
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Login
                </Button>
              )}
              <Tooltip title="Profile pic">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
