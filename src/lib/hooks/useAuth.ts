import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authServices";
import { UseAuthReturn } from "../types";

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: FormEvent, isSignUp: boolean): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await authService.signUp(email, password);
      } else {
        await authService.login(email, password);
      }
      router.push("/editor");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleAuth,
  };
};
