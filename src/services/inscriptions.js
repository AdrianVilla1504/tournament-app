const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function validate_existing_inscription(user_id, tournament_id) {
  try {
    const response = await fetch(`${BASE_API_URL}/inscriptions/validations`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, tournament_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on validation: ", error);
  }
}

export async function create_new_inscription(new_inscription) {
  try {
    const response = await fetch(`${BASE_API_URL}/inscriptions`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_inscription),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating inscription: ", error);
  }
}
