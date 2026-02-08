import { NavLink } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaUserAlt, FaShoppingCart } from 'react-icons/fa';

function Header({ isLoggedIn, cartProducts }) {

    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out";

    const getNavLinkClasses = ({ isActive }) => {
        if (isActive) {
            return `${baseClasses} bg-gray-900 text-white`;
        } else {
            return `${baseClasses} text-gray-900 hover:bg-gray-700 hover:text-white`;
        }
    };

    let cartTotal = 0;

    cartProducts.forEach(product => {
        cartTotal += product.qty;
    });

    return (
        <header>
            <nav className="bg-gray-50 p-4 border rounded-md">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-5xl">
                    <NavLink to="/" className="flex items-center">
                        <img src="/logo.png" alt="logo" className="h-10 w-auto" />
                    </NavLink>
                    <div className="flex items-center space-x-0.5">
                        <NavLink to="/" className={getNavLinkClasses} end>
                            <FaHome style={{ marginRight: '5px' }} />
                        </NavLink>
                        <>
                            {isLoggedIn ? (
                                <>
                                    <NavLink to="/user" className={getNavLinkClasses} end>
                                        <FaUserAlt style={{ marginRight: '5px' }} />
                                    </NavLink>
                                </>
                            ) : (<></>)}
                            {!isLoggedIn ? (
                                <>
                                    <NavLink to="/login" className={getNavLinkClasses} end>
                                        <FaSignInAlt style={{ marginRight: '5px' }} />
                                    </NavLink>
                                </>
                            ) : (<></>)}
                        </>
                        <>
                            {!isLoggedIn ? (
                                <>
                                    <NavLink to="/register" className={getNavLinkClasses} end>
                                        <FaUserPlus style={{ marginRight: '5px' }} />
                                    </NavLink>
                                </>
                            ) : (<></>)}
                        </>
                        <>
                            {isLoggedIn ? (
                                <>
                                    <NavLink to="/cart" className={getNavLinkClasses}>
                                        <FaShoppingCart style={{ marginRight: '5px' }} />
                                    </NavLink>
                                    <span className="relative -top-1 right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                                        {cartTotal}
                                    </span>
                                </>
                            ) : (<></>)}
                        </>
                    </div>
                </div>
            </nav>
        </header >
    );

}

export default Header;