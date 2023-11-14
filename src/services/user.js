const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

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
