import PostList from "../components/Feed-components/Post-List-Component"
import FilterFeed from "../components/Feed-components/Filter-Feed-Component"

function Feed(){
    return(
    <div className="h-fit">
    <FilterFeed/>
    <PostList/>
    </div>
    )
}

export default Feed
