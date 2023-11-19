const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function get_tournaments() {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments`, {
      mode: "cors",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tournamnets: ", error);
  }
}

export async function get_tournament_by_id(id) {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments/${id}`, {
      mode: "cors",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tournamnets: ", error);
  }
}

export async function create_new_tournament(new_tournament) {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_tournament),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating tournament: ", error);
  }
}

export async function edit_existing_tournament(id, updated_fields) {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated_fields),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating existing tournament: ", error);
  }
}

export async function delete_tournaments(id_array) {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id_array),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating existing tournament: ", error);
  }
}
