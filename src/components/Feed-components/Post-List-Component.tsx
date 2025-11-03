import { useState } from "react";
import PostComponent from "./Post-Component";
import data from "./FeedData.json";
import PostForm from "./PostForm";

function PostList (){
  const [posts, setPosts] = useState<any[]>(data);
  const [showForm, setShowForm] = useState(false);

  return(
    <div id="post-list-container" className="flex flex-col items-center gap-2.5 px-4 py-8 min-h-screen w-full bg-gradient-to-b from-brand-light to-white">
      <div id="post-list-header" className="flex flex-row justify-between max-w-100 w-full px-2">
        <h1 className="font-bold text-2xl">Ultimas publicaciones</h1>
        <button
          id="añadir-btn"
          className="text-brand font-bold bg-white rounded-2xl p-2 px-6 border hover:bg-brand hover:text-white cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          + Añadir
        </button>
      </div>

      {showForm && <PostForm />}

      <div id="post-list" className="flex flex-col items-center h-fit w-full max-w-lg gap-6 mt-4">
        {posts.map((p) => (
          <PostComponent
            key={p.id}
            user={p.user}
            pic={p.profilePic}
            time={p.time}
            text={p.text}
            img={p.image}
            cat={p.category}
            likes={p.likes}
            commentsList={p.commentsList}
          />
        ))}
      </div>

      <h3 className="my-10 text-gray-500">No hay mas posts...</h3>
    </div>
  )
}

export default PostList