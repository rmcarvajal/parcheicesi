import { useState } from "react"
import PostComponent from "./Post-Component"
import data from "./FeedData.json"

function PostList (){
    const [posts] = useState(data)
    

    return(
        <div id="post-list-container" className="flex flex-col items-center gap-2.5 px-4 py-30 h-fit w-screen md:w-full md:py-5 md:inset-shadow-sm md:inset-shadow-black bg-gradient-to-b from-brand-light to-white">
            <div id="post-list-header" className="flex flex-row justify-between max-w-100 w-full">
                <h1 className="font-bold text-2xl">Latest Posts</h1>
                <button className="text-brand font-bold bg-white rounded-2xl p-2 px-6 border-1 hover:bg-brand hover:text-white hover:border-brand cursor-pointer">+ Añadir</button>
            </div>
            <div id="post-list" className="flex flex-col items-center h-fit w-full max-w-lg gap-10.5">
            {posts.map((p) => (<PostComponent key={p.id} user={p.user} pic={p.profilePic} time={p.time}text={p.text} img={p.image} cat={p.category}/> ))} 
            </div>
        </div>
    )
}

export default PostList