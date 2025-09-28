import { supabase } from "@/lib/supabaseClient";
import { CreatePageData, Page } from "@/lib/types";

export class PageService {
  async createPage(pageData: CreatePageData): Promise<Page> {
    const { data, error } = await supabase
      .from("pages")
      .insert([pageData])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new Error(
          "This username is already taken. Please choose another one."
        );
      } else if (error.code === "42501") {
        throw new Error(
          "Permission denied. Please check if you're signed in properly."
        );
      } else {
        throw new Error(error.message);
      }
    }

    if (!data) {
      throw new Error("No data returned from database");
    }

    return data;
  }
}

export const pageService = new PageService();
