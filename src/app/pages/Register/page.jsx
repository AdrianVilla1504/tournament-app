"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { register_new_user } from "@/services/users";
function Register() {
  const router = useRouter();
  const handleSubmitUser = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const new_user = {
        fullname: data.get("fullname"),
        email: data.get("email"),
        password: data.get("password"),
      };
      const registered_user = await register_new_user(new_user).then(
        async (response) => {
          if (response.success) {
            const next_auth_login = await signIn("credentials", {
              email: new_user.email,
              password: new_user.password,
              redirect: false,
            });
            if (next_auth_login?.ok) return router.push("/");
          }
        }
      );
    } catch (error) {
      throw new Error("Register error ", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        background: "white",
        borderRadius: "8px",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="black">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitUser}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fullname"
                name="fullname"
                required
                fullWidth
                label="Full name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email Address"
                name="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/api/auth/signin" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
