import { useState } from "react"
import PostComponent from "./Post-Component"
import data from "./FeedData.json"

function PostList (){
    const [posts, setPosts] = useState(data)
    

    return(
        <div id="post-list" className="flex flex-col gap-2.5 px-4 pt-18 bg-linear-to-b from-brand-light to-white">
            <h1 className="font-bold text-2xl">Latest Posts</h1>
            <div className="flex flex-col h-fit gap-10.5">
            {posts.map((p) => (<PostComponent key={p.id} user={p.user} pic={p.profilePic} time={p.time}text={p.text} img={p.image} cat={p.category}/> ))} 
            </div>
        </div>
    )
}

export default PostList