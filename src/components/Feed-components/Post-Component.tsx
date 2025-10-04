
import PostInteractions from "./Post-Interaction";
interface PostCompProps{
    user: string;
    pic: string;
    time: number;
    text: string;
    img: string;
    cat?: string;
}

function PostComponent({user, pic, time, text, img, cat}:PostCompProps){

    return(
    <div id="post-component" className="flex flex-col bg-white gap-3.5 p-2.5 w-full border-black border-2 rounded-2xl">
        <div className="flex flex-row gap-2.5">
            <img src={pic} className="w-13 h-13 rounded-full"></img>
            <div className="flex flex-col gap-2.5">
                <h3 className="font-bold text-2l text-brand">{user}</h3>
                <p className="font-light text-sm">Hace {time} horas</p>
            </div>
        </div>
        <p className="font-light text-sm line-clamp-2">{text}</p>
        <div className="flex h-74 overflow-hidden align-middle rounded-2xl object-center focus:h-fit">
            <img className="w-full object-cover " src={img}></img>
        </div>
        <PostInteractions/>
    </div>
    )
}

export default PostComponent