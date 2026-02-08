import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { checkLogin } from '../services/userService';

export default function Home({
    getUsername,
    username,
    getLoggedIn,
    isLoggedIn,
    isLoadingProducts,
    products,
    productClicked,
    fetchProductsError
}) {

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const response = await checkLogin()
                    getLoggedIn(true)
                    getUsername(response.data.username)
                }
                else {
                    getLoggedIn(false);
                    getUsername("");
                }
            }
            catch (error) {
                console.log("Check logged user error from home", error)
                getLoggedIn(false);
                getUsername("");
            }
        };
        checkLoggedInUser()
    }, [getLoggedIn, getUsername])

    if (isLoadingProducts) return <div className="flex items-center justify-center"><LoadingIndicator /></div>
    if (fetchProductsError) return <p className="flex items-center justify-center text-2xl text-red-500">Error: {fetchProductsError}</p>;

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <h1 className="text-3xl font-extrabold p-2">Hi, {username}. Thanks for log in!</h1>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-extrabold p-2">Please Login</h1>
                    </>
                )
            }
            <div>
                <h2 className="text-2xl font-bold p-2">Product List</h2>
            </div>
            <div className="container mx-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                    {
                        products.map(product => {
                            return (
                                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto border">
                                    <div className="m-2">
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                class="w-full h-48 object-fit"
                                                onClick={() => { productClicked(product) }}
                                                src={`https://dsc-ideas.cloud${product.image}`}
                                                alt={product.name}
                                            />
                                        </Link>
                                    </div>
                                    <div className="p-6">
                                        <div onClick={() => { productClicked(product) }} className="font-bold text-gray-900 mb-2 line-clamp-2 text-center">
                                            <Link to={`/product/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </div>
                                        <p className="text-gray-600 mb-2 text-center">$ {product.price}</p>
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => { productClicked(product) }} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                                <Link to={`/product/${product.id}`}>
                                                    See more
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </ >
    )
}