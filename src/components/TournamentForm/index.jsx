"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  get_tournament_by_id,
  create_new_tournament,
  edit_existing_tournament,
} from "@/services/tournaments";

function TournamentForm({ tournament_id_to_edit }) {
  const router = useRouter();
  const [existing_tournament, set_existing_tournament] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const tournament = async () => {
      await get_tournament_by_id(tournament_id_to_edit).then((response) => {
        set_existing_tournament(response);
        setLoader(false);
      });
    };

    if (!tournament_id_to_edit) {
      setLoader(false);
    }
    if (tournament_id_to_edit) tournament();
  }, [tournament_id_to_edit]);

  const handle_edit_existing_tournament = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const edited_tournament = {};
    if (data.get("name")) edited_tournament.name = data.get("name");
    if (data.get("city")) edited_tournament.city = data.get("city");
    if (data.get("tennis_court"))
      edited_tournament.tennis_court = data.get("tennis_court");
    if (data.get("max_contestants"))
      edited_tournament.max_contestants = data.get("max_contestants");
    if (data.get("inscription_price"))
      edited_tournament.inscription_price = data.get("inscription_price");
    if (beggining_date["$d"])
      edited_tournament.beggining_date = beggining_date["$d"];

    try {
      const response = await edit_existing_tournament(
        tournament_id_to_edit,
        edited_tournament
      );
      if (response.success) {
        router.push("/pages/AdminHome");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handle_submit_new_tournament = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const new_tournament = {
      name: data.get("name"),
      city: data.get("city"),
      tennis_court: data.get("tennis_court"),
      max_contestants: data.get("max_contestants"),
      inscription_price: data.get("inscription_price"),
      beggining_date: beggining_date["$d"],
    };

    try {
      const response = await create_new_tournament(new_tournament);
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
        {loader ? (
          <CircularProgress />
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={
              tournament_id_to_edit
                ? handle_edit_existing_tournament
                : handle_submit_new_tournament
            }
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Tournament name"
                  name="name"
                  defaultValue={
                    existing_tournament?.name ? existing_tournament.name : ""
                  }
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
                  defaultValue={
                    existing_tournament?.city ? existing_tournament.city : ""
                  }
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
                  defaultValue={
                    existing_tournament?.tennis_court
                      ? existing_tournament.tennis_court
                      : ""
                  }
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
                  defaultValue={
                    existing_tournament?.max_contestants
                      ? String(existing_tournament.max_contestants)
                      : String(0)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="inscription_price"
                  name="inscription_price"
                  fullWidth
                  label="Price"
                  autoFocus
                  defaultValue={
                    existing_tournament?.inscription_price
                      ? String(existing_tournament.inscription_price)
                      : String(0)
                  }
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    id="beggining_date"
                    name="beggining_date"
                    label="Beggining date"
                    disablePast
                    defaultValue={
                      existing_tournament?.beggining_date
                        ? dayjs(existing_tournament?.beggining_date)
                        : null
                    }
                    onChange={(date) => set_beggining_date(date)}
                  />
                </Grid>
              </LocalizationProvider>

              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              id="create_tournament_button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {existing_tournament?._id
                ? "Edit tournament"
                : "Create new tournament"}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default TournamentForm;
