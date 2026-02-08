import { Link } from "react-router-dom";

function Order({
    createOrderFromCartMessage,
    createOrderFromCartError,
    getOrderItems }) {

    return (
        <>
            <>
                {createOrderFromCartError && <span className="mt-2 text-red-500 text-xl">{createOrderFromCartError}</span>}
            </>
            <>
                {(createOrderFromCartMessage) && (
                    <div>
                        {createOrderFromCartMessage.map(
                            message => (
                                <div key={message.message}>
                                    <h1 className="font-bold text-3xl p-2 m-2">{message.message}</h1>
                                    <h2 className="font-semibold text-2xl p-2 m-2">Click on order id to see more order details</h2>
                                    <Link className="text-xl p-2 m-2" onClick={() => { getOrderItems(message.order_id) }} to={"/order-items"}>Orden id: {message.order_id}</Link>
                                </div>
                            )
                        )}
                    </div>
                )
                }
            </>
        </>
    )
}
export default Order;