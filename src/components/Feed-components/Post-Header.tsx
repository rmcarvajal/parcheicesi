

interface HeaderProps{
    user: string;
    pic: string;
    time: number;
}

function PostHeader({user, pic, time}:HeaderProps ){

    return(
        <div className="flex flex-row">
            <img src={pic} className="w-10 h-10"></img>
            <div className="flex flex-col">
                <h3 className="text-">{user}</h3>
                <p>Hace {time} horas</p>
            </div>
        </div>
    )
}

export default PostHeader