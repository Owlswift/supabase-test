import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";
import { PublishedPageProps } from "@/lib/types";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("username", params?.username)
    .eq("published", true)
    .single();

  if (!page) {
    return { notFound: true };
  }

  return { props: { page } };
};

export default function PublicPage({ page }: PublishedPageProps) {
  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">The page do not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta
          name="description"
          content={`Personal page of ${page.username}`}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar
          user={null}
          showEditorLink={true}
          title={`@${page.username.toUpperCase()}`}
        />

        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/60">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              {page.title}
            </h1>

            {page.content ? (
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">✨</div>
                <p className="text-gray-500 italic">Content coming soon...</p>
              </div>
            )}
          </div>
        </main>

        <footer className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-500 text-sm">Powered by MySite</p>
        </footer>
      </div>
    </>
  );
}
