import PostList from "../components/Feed-components/Post-List-Component"
import FilterFeed from "../components/Feed-components/Filter-Feed-Component"
import Header from "../components/navegation/Header"

function Feed(){
    return(
    <div className="h-fit">
    <header id='header' className="flex flex-col w-screen bg-white px-5 py-2.5 gap-2.5 shadow-black shadow-sm fixed">
        <Header/>
        <FilterFeed/>
    </header>
    <PostList/>
    </div>
    )
}

export default Feed
