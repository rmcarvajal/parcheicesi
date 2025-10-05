

function FilterFeed (){
    const filterBtn = "bg-secondary text-white rounded-md p-1 px-4 md:w-full md:py-2 md:mx-2"
    return(
        <div id="filter-feed" className="overflow-scroll md:overflow-auto w-full ">
        
            <div className="flex flex-row gap-2.5 justify-around">
                <button className={filterBtn}>Eventos</button>
                <button className={filterBtn}>Campus</button>
                <button className={filterBtn}>Noticias</button>
                <button className={filterBtn}>Donaciones</button>
            </div>
        </div>
    )
}

export default FilterFeed