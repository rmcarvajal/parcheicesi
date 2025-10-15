import { useState } from "react";

function PostInteractions () {
    
    
    const heartOff = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart text-black" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
    );
    const heartOn = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill text-brand" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
    );
    
    //estado del boton y contador
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    
    //cambia el estado de likes y el contador
    const handleLike = () => {
        setLiked(!liked);
        setLikes(likes + (liked ? -1 : 1));
    };

    //cambia el color del contador
    const likedColors = liked? "text-brand": "text-black"
    const btnState = liked? "bg-brand text-white font-bold": "bg-white text-black font-regular"

    const btnEffects = "hover:bg-brand-light hover:text-brand cursor-pointer active:bg-brand active:text-white w-full rounded-md p-1 transition ";

    return (
        <div className="p-2.5 flex flex-col">
            <div className="flex flex-row items-center h-fit gap-0.5">
                <button onClick={handleLike} className="focus:outline-none">
                    {liked ? heartOn : heartOff}
                </button>
                <h2 id="like-counter" className={likedColors + " flex items-baseline text-lg"}>{likes}</h2>
            </div>
            <div className="flex justify-around">
                <button className={btnEffects + btnState} onClick={handleLike}>{liked ? "Liked" : "Like"}</button>
                <button className={btnEffects}>Comment</button>
                <button className={btnEffects}>Share</button>
            </div>
        </div>
    );
}

export default PostInteractions