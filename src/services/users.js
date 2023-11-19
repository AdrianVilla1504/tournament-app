const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function get_users() {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      mode: "cors",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error on user register: ", error);
  }
}

export async function get_user_by_id(id) {
  try {
    const response = await fetch(`${BASE_API_URL}/users/${id}`, {
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
    console.error("Error fetching user: ", error);
  }
}

export async function register_new_user(new_user) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_user),
    });
    return response.json();
  } catch (error) {
    console.error("Error on user register: ", error);
  }
}

export async function update_existing_user(id, updated_fields) {
  try {
    const response = await fetch(`${BASE_API_URL}/users/${id}`, {
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
    console.error("Error on user update: ", error);
  }
}

export async function delete_users(id_array) {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
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
