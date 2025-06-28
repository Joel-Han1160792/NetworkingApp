import LoginImage from '../assets/200630_fciccolella_money_final.webp';

export function LoginForm() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg flex overflow-hidden">
                {/* Image */}
                <div className="hidden lg:flex flex-col justify-center items-center bg-indigo-600 dark:bg-indigo-700 w-1/2 relative">
                    <img
                        src={LoginImage}
                        alt="Login Illustration"
                        className="object-cover w-full h-full"
                        style={{ maxHeight: 420, objectPosition: 'right center' }} 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-800/40">
                        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">Welcome Back!</h2>
                        <p className="text-white text-lg opacity-80">NetworkingApp makes your connection easier.</p>
                    </div>
                </div>
                {/* Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                        Sign In
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            className="
                                w-full 
                                bg-indigo-600 
                                hover:bg-indigo-700 
                                text-white 
                                font-medium 
                                py-2.5 
                                rounded-lg 
                                transition-colors
                                dark:bg-indigo-500 
                                dark:hover:bg-indigo-600
                            "
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                        Don't have an account?
                        <a
                            href="#"
                            className="ml-1 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
