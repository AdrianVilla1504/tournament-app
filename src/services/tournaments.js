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
