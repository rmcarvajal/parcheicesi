
import PostHeader from "./Post-Header";
interface PostCompProps{
    text: string;
    img: string;
}

function PostComponent({text, img}:PostCompProps){
    return(
    <div className="flex flex-col p-2.5">
    <PostHeader user="Universidad Icesi" pic="https://yt3.googleusercontent.com/2__G-ckA66-4JgXPlHTGZvg8CoUIgDU6qYFnJqW-AsVeJvBRT4hCjXz4XMOjIqm4m7v431lT=s900-c-k-c0x00ffffff-no-rj" time={21}></PostHeader>
    <p>{text}</p>
    <img src={img}></img>
    </div>
    )
}

export default PostComponent