/**
 * useSignup.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z Signup.tsx (smart-ui) - analogicznie do useLogin.ts.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../api/tokenStorage";
import { ApiError } from "../api/httpClient";

export function useSignup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupError, setSignupError] = useState<string>("");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { token } = await authApi.signup(username, email, password);
      tokenStorage.set(token);

      const signedIn = signIn({ auth: { token, type: "Bearer" } });
      if (signedIn) {
        navigate("/");
      }
    } catch (err) {
      const message = err instanceof ApiError ? "Registration failed. Please check your details." : "An error occurred. Please try again later.";
      setSignupError(message);
    }
  };

  return { username, setUsername, email, setEmail, password, setPassword, signupError, handleSubmit };
}
