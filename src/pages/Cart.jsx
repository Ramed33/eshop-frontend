import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Cart({
    cartProducts,
    removeCart,
    cartDeleteMessage,
    cartDeleteError,
    cartIncDecMessage,
    cartIncDecError,
    cartError,
    products,
    plusCartButton,
    minusCartButton,
    cartClicked,
    createBuyOrder }) {

    let cartItemDescription = [];
    cartProducts.forEach(element => {
        cartItemDescription.push(products[element.product - 1]);
    });

    const newCartItemDescriptionWithProductId = cartItemDescription.map(item => {
        return { product: item?.id, name: item?.name, price: item?.price, image: item?.image };
    });

    let array1 = newCartItemDescriptionWithProductId;
    let array2 = cartProducts;

    const mapObjetos = {};

    array1.forEach(obj => {
        mapObjetos[obj?.product] = obj;
    });

    array2.forEach(obj => {
        if (mapObjetos[obj.product]) {
            mapObjetos[obj.product] = { ...mapObjetos[obj.product], ...obj };
        } else {
            mapObjetos[obj.product] = obj;
        }
    });

    const cartUpdated = Object.values(mapObjetos);

    let cartTotalProducts = 0;
    let cartTotalDue = 0;
    cartUpdated.forEach((productQty) => {
        cartTotalProducts += productQty.qty;
        cartTotalDue += productQty.qty * productQty.price;
    });

    if (cartError.length > 0) return <p className="flex items-center justify-center text-2xl text-red-500">Error: {cartError}</p>;

    return (
        <div>
            {cartError && <p style={{ color: "red" }}>{cartError}</p>}
            <h2 className="text-2xl font-bold p-2">Cart products: {cartTotalProducts} </h2>
            <h2 className="text-2xl font-bold p-2">Cart total: {cartTotalDue.toFixed(2)} </h2>
            {cartTotalProducts === 0 ? (
                <div className="flex items-center justify-center">
                    <h2 className="text-2xl font-bold p-2">Add products to your cart</h2>
                </div>
            ) :
                (
                    <div className="flex items-center justify-center">
                        <Link to="/order">
                            <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded w-sm" onClick={() => createBuyOrder()}>
                                Buy cart
                            </button>
                        </Link>
                    </div>
                )
            }
            <div className="mt-2 text-green-500 text-xl">
                {cartDeleteMessage && <span>{cartDeleteMessage}</span>}
            </div>
            <div className="mt-2 text-red-500 text-xl">
                {cartDeleteError && <span>{cartDeleteError}</span>}
            </div>
            <div className="mt-2 text-green-500 text-xl">
                {cartIncDecMessage && <span>{cartIncDecMessage}</span>}
            </div>
            <div className="mt-2 text-red-500 text-xl">
                {cartIncDecError && <span>{cartIncDecError}</span>}
            </div>
            {
                cartUpdated.map(cart => {
                    return (
                        <div className="flex justify-between items-center bg-gray-50 rounded-md border m-2" key={cart.id}>
                            <div onClick={() => { cartClicked(cart) }} className="flex items-center gap-2 font-bold">
                                <Link to={`/product/${cart.product}`}>
                                    <img className="w-20 h-20 m-2 rounded-md" src={`https://dsc-ideas.cloud${cart.image}`} alt={cart.name} />
                                </Link>
                                <p className="text-xl font-bold">x</p>
                                <div className='flex flex-col gap-2 font-bold'>
                                    <FaPlus
                                        className="hover:bg-gray-700 hover:text-white cursor-pointer"
                                        onClick={() => { plusCartButton(cart) }}
                                        style={{ marginRight: '5px' }}
                                    />
                                    <p className="text-xl font-bold">{cart.qty}</p>
                                    {cart.qty > 1 ?
                                        (
                                            <FaMinus
                                                className="hover:bg-gray-700 hover:text-white cursor-pointer"
                                                onClick={() => { minusCartButton(cart) }}
                                                style={{ marginRight: '5px' }}
                                            />
                                        ) :
                                        (
                                            <FaTrashAlt
                                                className="hover:bg-gray-700 hover:text-white cursor-pointer"
                                                onClick={() => { removeCart(cart) }}
                                                style={{ marginRight: '5px' }}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <p className="text-xl font-bold pl-2">$ {(cart.qty * cart.price).toFixed(2)}</p>
                            <FaTrashAlt
                                className="hover:bg-gray-700 hover:text-white cursor-pointer"
                                onClick={() => { removeCart(cart) }}
                                style={{ marginRight: '5px' }}
                            />
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Cart;