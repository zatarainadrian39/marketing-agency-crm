"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signIn(event) {
    event.preventDefault();
    setMessage("Signing in...");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Signed in. Loading CRM...");
    window.location.assign("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <form onSubmit={signIn} className="bg-white p-8 rounded-2xl shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-2">CRM Login</h1>
        <p className="text-sm text-slate-500 mb-6">Sign in to access your agency CRM.</p>

        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit" className="w-full bg-black text-white rounded-lg p-3">
          Sign In
        </button>

        {message && <p className="text-sm mt-4">{message}</p>}
      </form>
    </main>
  );
}