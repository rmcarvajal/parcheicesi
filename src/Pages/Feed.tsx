// Importa el componente que renderiza la lista de publicaciones del feed
import PostList from "../components/Feed-components/Post-List-Component"

// Hook para detectar el tamaño de pantalla y aplicar comportamiento responsivo
import useMediaQuery from 'react-responsive';

// Importa la barra de navegación inferior
import Navbar from "../components/Navbar"

// Importa el header superior del feed
import HeaderFeed from "../components/navegation/HeaderFeed"


function Feed(){
  
    // Detecta si el ancho de pantalla es de escritorio (>= 768px)
    const dskSize = useMediaQuery({ minWidth: 768 });

    // Contenedor de la Navbar móvil: se posiciona fija al fondo
    const navBarMvl = (
      <div className="fixed bottom-0 w-full z-5 bg-white">
        <Navbar />
      </div>
    );

    return(
      // Contenedor general del feed
      <div id="feed" className="flex flex-col">

        {/* Header superior del feed */}
        <HeaderFeed/>

        {/* Lista de posts del usuario / comunidad */}
        <PostList/>

        {/* Navbar móvil (solo aparece cuando NO es tamaño escritorio) */}
        {!dskSize && navBarMvl}
      </div>
    )
}

export default Feed
