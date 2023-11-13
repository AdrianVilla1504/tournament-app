const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function get_tournaments() {
  try {
    const response = await fetch(`${BASE_API_URL}/tournaments`, {
      cache: "no-store",
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
