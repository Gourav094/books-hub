import Genre from "./Genre"

const Body = () => {
    return (
        <>
            <div className="max-w-[1100px] mx-auto py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-widest pb-4">BooksHub | Read eBooks - Novels</h1>
                    <p className="pb-10 pt-2 font-semibold">Think before you speak. Read before you think. – Fran Lebowitz</p>
                    <button></button>
                </div>
                <div className="border-b border-gray-700"></div>
            </div>
            <div className="max-w-7xl mx-auto">
                <Genre/>
            </div>
        </>
    )
}

export default Body
