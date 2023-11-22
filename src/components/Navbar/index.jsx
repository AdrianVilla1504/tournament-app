"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
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

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session && pathname !== "/") {
      return router.push("/");
    }

    if (
      session?.user.role === "ADMIN" &&
      (pathname === "/" || pathname === "/pages/PaymentConfirmSignUp")
    ) {
      return router.push("/pages/AdminHome");
    } else if (
      session?.user.role !== "ADMIN" &&
      (pathname === "/pages/AdminHome" ||
        pathname === "/pages/CreateTournament" ||
        pathname === "/pages/AdminHome/Users" ||
        pathname === "/pages/AdminHome/Users/EditUser")
    ) {
      return router.push("/");
    }
  }, [router, session]);
  const create_tournament = () => {
    router.push("/pages/CreateTournament");
  };

  const login_redirect = () => {
    router.push("/api/auth/signin");
  };

  const register_redirect = () => {
    router.push("/pages/Register");
  };

  const logout_redirect = () => {
    router.push("/api/auth/signout");
  };

  const button_panel_setter = (pathname) => {
    switch (pathname) {
      case "/pages/AdminHome":
        return "to users panel";
      case "/pages/AdminHome/Users":
        return "to tournaments panel";
      default:
        return "back";
    }
  };

  const change_admin_panel = () => {
    if (pathname === "/pages/AdminHome") {
      return router.push("/pages/AdminHome/Users");
    } else if (pathname === "/pages/AdminHome/Users") {
      return router.push("/pages/AdminHome");
    } else {
      return router.back();
    }
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
              href={session?.user?.role === "ADMIN" ? "/pages/AdminHome" : "/"}
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
              {session?.user.role !== "ADMIN" ? (
                ""
              ) : (
                <>
                  <Button
                    onClick={() => change_admin_panel()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Go {button_panel_setter(pathname)}
                  </Button>
                  <Button
                    onClick={() => create_tournament()}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Create new tournament
                  </Button>
                </>
              )}
            </Box>
            {session?.user ? (
              <Box sx={{ display: "flex", marginRight: "30px" }}>
                <Typography sx={{ paddingX: "3px" }}>Welcome</Typography>
                {session?.user?.role === "ADMIN" ? (
                  <Typography>to user admin panel</Typography>
                ) : (
                  ""
                )}
                <Typography sx={{ fontWeight: 600, paddingX: "3px" }}>
                  {session?.user?.name}
                </Typography>
              </Box>
            ) : (
              <></>
            )}
            <Box sx={{ display: "flex" }}>
              {session?.user.id ? (
                <>
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={logout_redirect}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={login_redirect}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={register_redirect}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
