// Importa el componente que renderiza la lista de publicaciones
import PostList from "../components/Feed-components/Post-List-Component"

// Importa el componente de filtros del feed (categorías, orden, etc.)
import FilterFeed from "../components/Feed-components/Filter-Feed-Component"

// Importa la barra de navegación lateral para escritorio
import NavBarDsk from "../components/NavbarDsk"


function FeedPC(){
    return(
        // Contenedor principal del feed en escritorio, usa layout en fila
        <div id="feed" className="flex flex-row w-full">

            {/* Barra de navegación lateral para pantallas grandes */}
            <NavBarDsk/>

            {/* Columna principal donde va el contenido del feed */}
            <div className="flex flex-col w-full">

                {/* Contenedor del filtro del feed */}
                {/* sticky permite que quede fijo arriba mientras se scrollea */}
                <div className="p-5 w-full sticky top-0 bg-white z-10 shadow-sm shadow-black">
                    <FilterFeed/>
                </div>

                {/* Lista de publicaciones */}
                <PostList/>
            </div>
        </div>
    )
}

export default FeedPC
