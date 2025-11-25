import PostList from "../components/Feed-components/Post-List-Component"
import useMediaQuery from 'react-responsive';
import Navbar from "../components/Navbar"
import HeaderFeed from "../components/navegation/HeaderFeed"



function Feed(){
  

    const dskSize = useMediaQuery({ minWidth: 768 });
    const navBarMvl = (
    <div className="fixed bottom-0 w-full z-5 bg-white">
      <Navbar />
    </div>
    );
    return(
    <div id="feed" className="flex flex-col">
    <HeaderFeed/>
    <PostList/>
    {/* Navbar móvil */}
        {!dskSize && navBarMvl}
    </div>
    )
}

export default Feed
