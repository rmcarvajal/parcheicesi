

function PostInteractions (){
    const btnEffects = "hover:bg-brand-light hover:text-brand cursor-pointer active:bg-brand active:text-white w-full rounded-md p-1"
    return(
        <div className="p-2.5 flex flex-col">
            <div className="flex flex-row items-center h-fit gap-0.5">
                <img className="h-5 w-5 mt-1" src="src\Assets\heart.svg"></img>
                <h2 className="flex items-baseline text-lg">0</h2>
            </div>
            <div className="flex justify-around">
                <button className={btnEffects}>Like</button>
                <button className={btnEffects}>Comment</button>
                <button className={btnEffects}>Share</button>
            </div>
        </div>
    )
}

export default PostInteractions