import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { pageService } from "@/services/pageService";
import { UsePageEditorReturn } from "../types";

export const usePageEditor = (): UsePageEditorReturn => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const handlePublish = async (): Promise<void> => {
    if (!user) {
      router.push("/");
      return;
    }

    if (!username.trim()) {
      alert("Set a username for your URL first.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    setLoading(true);

    try {
      const data = await pageService.createPage({
        owner_id: user.id,
        username: username.trim().toLowerCase(),
        title: title.trim(),
        content: content.trim(),
        published: true,
      });

      alert("Page published successfully!");
      router.push(`/web/${data.username}`);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    username,
    setUsername,
    title,
    setTitle,
    content,
    setContent,
    loading,
    handleSignOut,
    handlePublish,
  };
};
