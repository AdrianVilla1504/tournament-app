"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { get_user_by_id, update_existing_user } from "@/services/users";

function FormEditUser({ user_id_to_edit }) {
  const router = useRouter();
  const [existing_user, set_existing_user] = useState({});

  useEffect(() => {
    const user = async () => {
      await get_user_by_id(user_id_to_edit).then((response) => {
        if (response.success) {
          set_existing_user(response.user);
        }
      });
    };

    if (user_id_to_edit) user();
  }, [user_id_to_edit]);

  const handleSubmitFields = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const updated_fields = {};
      if (data.get("fullname")) updated_fields.fullname = data.get("fullname");
      if (data.get("email")) updated_fields.email = data.get("email");
      if (data.get("password")) updated_fields.password = data.get("password");
      const update_user = await update_existing_user(
        user_id_to_edit,
        updated_fields
      ).then((response) => {
        if (response.success) {
          alert(`User ${response?.updated_user?.fullname} updated. !`);
          return router.push("/pages/AdminHome/Users");
        }
      });
    } catch (error) {
      alert(`Error updating user!`);
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
          Update User
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitFields}
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
                placeholder={existing_user ? existing_user.fullname : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email Address"
                name="email"
                required
                fullWidth
                placeholder={existing_user ? existing_user.email : ""}
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
                placeholder="Replace forgotten password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update user
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default FormEditUser;
