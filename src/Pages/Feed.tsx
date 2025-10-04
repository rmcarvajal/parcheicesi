import PostList from "../components/Feed-components/Post-List-Component"
import FilterFeed from "../components/Feed-components/Filter-Feed-Component"
import Header from "../components/navegation/Header"
import HeaderFeed from "../components/navegation/HeaderFeed"

function Feed(){
    return(
    <div id="feed">
    <HeaderFeed/>
    <PostList/>
    </div>
    )
}

export default Feed
