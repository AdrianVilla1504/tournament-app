"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { create_new_tournament } from "@/services/tournaments";

export default function SignUp() {
  const router = useRouter();

  const [beggining_date, set_beggining_date] = useState(dayjs());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const new_tournament = {
      name: data.get("name"),
      city: data.get("city"),
      tennis_court: data.get("tennis_court"),
      max_contestants: data.get("max_contestants"),
      incription_price: data.get("incription_price"),
      beggining_date: beggining_date["$d"],
    };
    console.log("new_tournamnent => ", new_tournament);
    try {
      const response = await create_new_tournament(new_tournament);
      console.log("response => ", response);
      if (response.success) {
        router.push("/pages/AdminHome");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Tournament name"
                name="name"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                name="city"
                label="City"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="tennis_court"
                type="text"
                name="tennis_court"
                label="Tennis court"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="max_contestants"
                type="number"
                name="max_contestants"
                label="Maximum contestants"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="incription_price"
                name="incription_price"
                fullWidth
                label="Price"
                autoFocus
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  id="beggining_date"
                  name="beggining_date"
                  label="Beggining date"
                  disablePast
                  onChange={(date) => set_beggining_date(date)}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            id="create_torunament_button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create new tournament
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
