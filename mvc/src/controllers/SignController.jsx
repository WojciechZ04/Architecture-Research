import { signupUser, loginUser } from "../models/UserModel";

export async function handleSignup(
  username,
  email,
  password,
  signIn,
  navigate
) {
  try {
    const data = await signupUser(username, email, password);
    localStorage.setItem("token", data.token);

    if (
      signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
      })
    ) {
      navigate("/");
    }
  } catch (error) {
    console.error("Error in SignupController:", error);
    throw error;
  }
}

export async function handleLogin(username, password, signIn, navigate) {
  try {
    const data = await loginUser(username, password);
    localStorage.setItem("token", data.token);

    if (
      signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
      })
    ) {
      navigate("/");
    }
  } catch (error) {
    console.error("Error in LoginController:", error);
    throw error;
  }
}
