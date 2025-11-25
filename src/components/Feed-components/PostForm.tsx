// src/components/Feed-components/PostForm.tsx
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit?: (createdPost: any | null) => void;
}

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // get current user from supabase client (not redux) to ensure session persistence
  const user = null; // placeholder: don't rely on calling supabase.auth.getUser synchronously here; use Redux or call it when needed

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  // NOTE: We expect the app to know current user (from Redux auth slice). We'll read it here directly from supabase session
  const currentUser = null; // do not check supabase.auth.getUser as a boolean; prefer Redux or await supabase.auth.getUser() when needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // get session user id (preferred from redux auth; fallback to supabase)
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        alert("Inicia sesión para crear una publicación");
        setLoading(false);
        return;
      }

      let imageUrl: string | null = null;
      if (file) {
        const filePath = `${userId}/${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("posts").upload(filePath, file, { upsert: false });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("posts").getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const { data: inserted, error: insertErr } = await supabase
        .from("posts")
        .insert({
          id: uuidv4(),
          user_id: userId,
          text,
          image: imageUrl,
          category: category || "General",
          likes_count: 0,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;
      if (!inserted) throw new Error("No se pudo crear el post.");

      // fetch user info to build the object we will send back to the list (avoids waiting for realtime)
      const { data: userData } = await supabase.from("users").select("username, profile_pic").eq("id", userId).single();

      const createdPost = {
        id: inserted.id,
        user_id: inserted.user_id,
        user: userData?.username ?? "Unknown",
        profilePic: userData?.profile_pic ?? undefined,
        created_at: inserted.created_at,
        text: inserted.text,
        image: inserted.image,
        likes_count: inserted.likes_count ?? 0,
        commentsList: [],
        category: inserted.category,
      };

      // call callback so PostList prepends safely (no duplicates)
      if (onSubmit) onSubmit(createdPost);

      // cleanup
      setText("");
      setCategory("");
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      console.error("create post failed", err);
      alert("Error al crear post: " + (err.message || String(err)));
      if (onSubmit) onSubmit(null); // fallback: tell list to refresh
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4 bg-white rounded-2xl border border-brand shadow-md max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
      <textarea
        className="border rounded-md p-2 resize-none"
        placeholder="¿Qué quieres compartir?"
        value={text}
        onChange={handleTextChange}
        rows={3}
        maxLength={500}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file:mr-2 file:py-1 file:px-3 file:rounded-full file:border file:border-brand file:bg-brand-light file:text-brand"
      />

      {preview && (
        <img src={preview} alt="Vista previa" className="max-h-48 object-contain rounded-md border" />
      )}

      <button
        type="submit"
        className="bg-brand text-white font-bold py-2 rounded-xl hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || (!text && !preview)}
      >
        {loading ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
};

export default PostForm;
