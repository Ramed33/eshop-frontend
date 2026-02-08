import { useNavigate } from "react-router-dom";

function ProductDetails({
    isLoggedIn,
    selectedProduct,
    addCartButton,
    quantity,
    setQuantitySelect,
    cartAddMessage,
    cartAddError,
    cartUpdateError }) {

    const navigate = useNavigate();

    if (selectedProduct == null) {
        navigate('/');
    }

    return (
        <>
            <h1 className="text-3xl font-bold p-2">Product Details</h1>
            {selectedProduct &&
                <div key={selectedProduct.id} className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl m-4 border">
                    <div className="md:flex">
                        <div className="md:shrink-0 m-auto p-2">
                            <img
                                class="w-full h-48 object-fit"
                                src={`https://dsc-ideas.cloud${selectedProduct.image}`}
                                alt={selectedProduct.name}
                            />
                        </div>
                        <div className="p-8">
                            <div className="text-2xl font-bold p-2">
                                {selectedProduct.name}
                            </div>
                            <div className="text-xl font-bold p-2">
                                {selectedProduct.description}
                            </div>
                            <p className="mt-2 text-center text-gray-600 font-bold text-lg">$ {selectedProduct.price}</p>
                            <div className="mt-2 text-green-500 text-xl">
                                {cartAddMessage && <span>{cartAddMessage}</span>}
                            </div>
                            <div className="mt-2 text-red-500 text-xl">
                                {cartAddError && <span>{cartAddError}</span>}
                            </div>
                            <div className="mt-2 text-red-500 text-xl">
                                {cartUpdateError && <span>{cartUpdateError}</span>}
                            </div>
                            {isLoggedIn ?
                                (
                                    <>
                                        <div className="text-center mt-2 text-gray-900 text-lg">
                                            <span>Qty: </span>
                                            <select
                                                value={quantity}
                                                onChange={(e) => setQuantitySelect(Number(e.target.value))}
                                            >
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                                    <option value={num} key={num}>
                                                        {num}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={() => addCartButton(quantity)}>Add to cart</button>
                                        </div>
                                    </>
                                )
                                : (
                                    <div className="flex items-center justify-center">
                                        <p className="text-red-500 text-xl m-2">Please Loggin to buy</p>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetails;