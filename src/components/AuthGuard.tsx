"use client"; // This makes it a client component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!authToken) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
