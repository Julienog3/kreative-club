"use client";

import HomePage from "../components/layout/Page/HomePage";
import LandingPage from "../components/layout/Page/LandingPage";
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <HomePage user={user} />;
  } else {
    return <LandingPage />;
  }
}
