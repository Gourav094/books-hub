
const BookShimmer = () => {
    return (
        <div>
            <div className='flex space-x-4 gap-16 px-[10%] py-10'>
                <div className='w-1/4  animate-  bg-neutral-700 rounded-lg'>
                </div>
                <div className='flex animate-bounce flex-col gap-16 py-16 w-1/3'>
                    <div className='h-12 rounded-lg w-full bg-neutral-700'></div>
                    <div className='h-4 rounded-md w-96 bg-neutral-700'></div>
                    <div className='h-4 rounded-md w-96 bg-neutral-700'></div>
                    <div className='h-4 rounded-md w-96 bg-neutral-700'></div>
                </div>
            </div>
        </div>
    )
}

export default BookShimmer