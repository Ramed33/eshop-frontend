import { Link } from "react-router-dom"

function Orders({
    orders,
    getOrderItems,
    ordersError }) {

    if (orders.length === 0)
        return <h1 className="font-extrabold text-3xl p-2 m-2">You have no orders created</h1>

    if (ordersError) return <p className="flex items-center justify-center text-2xl text-red-500">Error: {ordersError}</p>;

    return (
        <div>
            <div className="font-extrabold text-3xl p-2 m-2">
                <h1 >Order list</h1>
            </div>
            {orders.map(
                order => (
                    <div className="p-2 m-2" key={order.id}>
                        <Link className="font-bold text-2xl" to={"/order-items"} onClick={() => { getOrderItems(order.id) }}>
                            Order id: {order.id}
                        </Link>
                        <h2 className="font-semibold text-xl">
                            Total price: {order.total_price}
                        </h2>
                        <h2 className="font-semibold text-xl">
                            Date of payment: {order.date_of_payment}
                        </h2>
                    </div>
                )
            )}
        </div>
    )
}

export default Orders;