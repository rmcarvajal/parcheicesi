function FilterFeed (){
    const filterBtn = "bg-secondary text-white rounded-md p-1 px-4"
    return(
        <div className="flex flex-col w-screen overflow-scroll bg-white px-5 py-2.5 gap-2.5 shadow-black shadow-sm fixed">
        
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