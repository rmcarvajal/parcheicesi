import PostList from "../components/Feed-components/Post-List-Component"
import FilterFeed from "../components/Feed-components/Filter-Feed-Component"
import NavBarDsk from "../components/NavbarDsk"


function FeedPC(){
    return(
    <div id="feed" className="flex flex-row w-full">
    <NavBarDsk/>
    <div className="flex flex-col w-full">
    <div className="p-5 w-full sticky top-0 bg-white z-10 shadow-sm shadow-black">
    <FilterFeed/>
    </div>
    <PostList/>
    </div>
    </div>
    )
}

export default FeedPC
