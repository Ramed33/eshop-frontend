import { NavLink } from "react-router-dom"

function User({
    username,
    getUserOrders,
    handleLogout }) {
    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold p-2">Hi {username}, welcome</h2>
            <NavLink to="/orders">
                <span onClick={getUserOrders} className="block text-2xl font-semibold px-4 py-2 rounded-md text-gray-700 hover:bg-gray-900 hover:text-white">
                    Orders
                </span>
            </NavLink>
            <NavLink to="/">
                <span onClick={handleLogout} className="block text-2xl font-semibold px-4 py-2 rounded-md text-gray-700 hover:bg-gray-900 hover:text-white">
                    Log out
                </span>
            </NavLink>
        </div>
    )
}

export default User;