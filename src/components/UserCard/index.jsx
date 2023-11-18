"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { delete_users } from "@/services/users";

function UserCard({ _id, fullname, email }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });

  const edit_user = (id) => {
    router.push(`/pages/AdminHome/Users/EditUser/${id}`);
  };

  const delete_user = async () => {
    const response = await delete_users({ ids_to_delete: [_id] });
    if (response.success) {
      router.push("/pages/AdminHome");
    } else if (response.auth_error) {
      alert("You are not authorized to delete users");
    }
  };

  return (
    <Grid item key={_id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            <span style={{ fontWeight: "bolder" }}>Fullname: {fullname}</span>
          </Typography>

          <p>
            <span style={{ fontWeight: "bolder" }}>email: </span>
            {email}
          </p>
        </CardContent>
        <CardActions>
          <>
            <Button size="small" onClick={() => edit_user(_id)}>
              Edit
            </Button>
            <Button size="small" onClick={() => delete_user()}>
              Delete
            </Button>
          </>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default UserCard;
