import { User } from "@supabase/supabase-js";
import { FormEvent } from "react";

export interface Profile {
  id: string;
  email: string;
  role: string;
}

export interface PageData {
  username: string;
  title: string;
  content: string;
}

export interface CreatePageData {
  owner_id: string;
  username: string;
  title: string;
  content: string;
  published: boolean;
}

export interface Page {
  id: string;
  owner_id: string;
  username: string;
  title: string;
  content: string;
  published: boolean;
  inserted_at: string;
  updated_at: string;
}

export interface PublishedPage {
  id: string;
  title: string;
  username: string;
  content: string;
  published: boolean;
}

export interface PublishedPageProps {
  page: PublishedPage | null;
}

export interface UsePageEditorReturn {
  user: User | null;
  username: string;
  setUsername: (username: string) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  loading: boolean;
  handleSignOut: () => Promise<void>;
  handlePublish: () => Promise<void>;
}

export interface UseAuthReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  handleAuth: (e: FormEvent, isSignUp: boolean) => Promise<void>;
}

export interface NavbarProps {
  user: User | null;
  onSignOut?: () => void;
  title?: string;
  showEditorLink?: boolean;
}
