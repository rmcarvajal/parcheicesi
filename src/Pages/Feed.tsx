import PostList from "../components/Feed-components/Post-List-Component"


import HeaderFeed from "../components/navegation/HeaderFeed"

function Feed(){
    return(
    <div id="feed" className="flex flex-col">
    <HeaderFeed/>
    <PostList/>
    </div>
    )
}

export default Feed
