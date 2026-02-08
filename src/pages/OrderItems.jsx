function OrderItems({
    orderItems,
    userOrderItemsError }) {

    if (userOrderItemsError) return <p className="flex items-center justify-center text-2xl text-red-500">Error: {userOrderItemsError}</p>;

    return (
        <div>
            <div className="font-extrabold text-3xl p-2 m-2">
                Order Items
            </div>
            {orderItems.map(
                item => (
                    <div key={item.id}>
                        <h2 className="font-semibold text-2xl p-2 m-2">
                            Order id: {item.order}
                        </h2>
                        <h2 className="font-semibold text-xl p-2 m-2">
                            Item: {item.product_name}
                        </h2>
                        <h2 className="text-xl p-2 m-2">
                            Quantity: {item.qty}
                        </h2>
                        <h2 className="text-xl p-2 m-2">
                            Price: $ {item.price}
                        </h2>
                    </div>
                )
            )}
        </div>
    )
}

export default OrderItems;