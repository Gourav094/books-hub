import book from "../assets/book.png"
import googleLogo from "../assets/google.png"
import { backend_API } from "../utils/constant"
const Login = () => {

    const handleLogin = () => {
        window.open(`${backend_API}/auth/google`,"_self")
    }

  return (
    <div className="">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full mt-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-14 w-auto" src={book} alt="Your Company"/>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                {/* <form className="space-y-6" action="#" method="POST">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input id="email" name="email" type="email" required className="px-4 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input id="password" required className="mt-2 px-4 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form> */}
                <div>
                    <button className="flex items-center justify-center gap-4 mt-4 border border-black w-full rounded-lg py-3 font-medium" onClick={handleLogin}>
                        <img className='h-6' src={googleLogo}/>
                        Sign in with Google</button>
                </div>
                {/* <p className="mt-8 text-center text-sm text-gray-500">
                Not a member?
                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up Now</a>
                </p> */}
            </div>
        </div>
        {/* <div className="w-1/2 my-2 max-h-screen">
            <img alt="loginImage" className="rounded-xl object-cover h-full w-full" src={bookLogin}/>
        </div> */}
    </div>
  )
}

export default Login
