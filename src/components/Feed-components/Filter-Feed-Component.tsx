

function FilterFeed (){
    const filterBtn = "bg-secondary text-white rounded-md p-1 px-4"
    return(
        <div className="overflow-hidden">
        
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