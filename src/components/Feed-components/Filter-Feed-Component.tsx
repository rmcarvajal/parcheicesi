
function FilterFeed (){
    const filterBtn = "bg-secondary text-white rounded-md cursor-pointer p-1 hover:bg-green-900 active:bg-green-900 transition px-4 md:w-full md:py-2 md:mx-2 "
    return(
        <div id="filter-feed" className="overflow-scroll md:overflow-auto w-full ">
        
            <div className="flex flex-row gap-2.5 justify-around">
                <button className={filterBtn}>Events</button>
                <button className={filterBtn}>Campus</button>
                <button className={filterBtn}>News</button>
                <button className={filterBtn}>Donations</button>
            </div>
        </div>
    )
}

export default FilterFeed