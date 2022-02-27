// constants
const URL = "https://smomsvxxaoqkfdwmihfg.supabase.co/rest/v1/users-database";
const HEADERS = {
  "Content-Type": "application/json",
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtb21zdnh4YW9xa2Zkd21paGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5ODk3MDMsImV4cCI6MTk2MTU2NTcwM30.aNPsG0RjV8VQstO0ytMtuaZLIbNn_2rtjONGE71wb18",
  Authorization:
    "Bearer" +
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtb21zdnh4YW9xa2Zkd21paGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5ODk3MDMsImV4cCI6MTk2MTU2NTcwM30.aNPsG0RjV8VQstO0ytMtuaZLIbNn_2rtjONGE71wb18",
};

export const addNewUser = async (url = URL, myHeaders = HEADERS, myBody) => {
  try {
    const res = await fetch(url, {
      headers: myHeaders,
      method: "POST",
      body: myBody,
    });
    if (res.status == 201) console.log("New user created successfully!");
  } catch (e) {
    console.log("Error fetch addNewUser:");
    console.log(e);
  }
};

export const logIn = async (url = URL, myHeaders = HEADERS, username) => {
  try {
    const res = await fetch(`${url}?username=eq.${username}&select=*`, {
      headers: myHeaders,
    });
    if (res.status === 200)
      console.log(
        "User data downloaded successfully! - The user is logged in!"
      );
    return res.json();
  } catch (e) {
    console.log("Error fetch logIn:");
    console.log(e);
  }
};
