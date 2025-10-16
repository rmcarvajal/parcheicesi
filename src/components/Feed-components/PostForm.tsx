import { useState, ChangeEvent, FormEvent } from "react";

interface PostFormProps {
  onSubmit?: (data: { text: string; image: File | null }) => void;
}

function PostForm({ onSubmit }: PostFormProps) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ text, image });
    }
    setText("");
    setImage(null);
    setPreview(null);
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 bg-white rounded-2xl border border-brand shadow-md max-w-lg w-full mx-auto"
      onSubmit={handleSubmit}
    >
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
        <img
          src={preview}
          alt="Vista previa"
          className="max-h-48 object-contain rounded-md border"
        />
      )}
      <button
        type="submit"
        className="bg-brand text-white font-bold py-2 rounded-xl hover:bg-brand-dark transition"
        disabled={!text && !image}
      >
        Publicar
      </button>
    </form>
  );
}

export default PostForm;