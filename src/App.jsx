import '../src/styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import Order from './pages/Order';
import Orders from './pages/Orders';
import OrderItems from './pages/OrderItems';
import User from './pages/User';
import { fetchCart, attachCart, incDecCart, eraseCart, actualizeCart } from './services/cartService';
import { fetchProducts } from './services/productsService';
import NotFound from './pages/NotFound';
import { createOrder, orderIdItems, ordersByUser } from './services/orderService';
import { checkLogin, logoutRun } from './services/userService';

function App() {

  const token = localStorage.getItem("accessToken");

  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [fetchProductsError, setFetchProductsError] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartError, setcartError] = useState([]);
  const [cartAddMessage, setCartAddMessage] = useState(null);
  const [cartAddError, setCartAddError] = useState(null);
  const [cartDeleteMessage, setCartDeleteMessage] = useState(null);
  const [cartDeleteError, setCartDeleteError] = useState([]);
  const [cartIncDecMessage, setCartIncDecMessage] = useState(null);
  const [cartIncDecError, setCartIncDecError] = useState(null);
  const [cartUpdateError, setCartUpdateError] = useState(null);
  const [createOrderFromCartMessage, setCreateOrderFromCartMessage] = useState(null);
  const [createOrderFromCartError, setCreateOrderFromCartError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [userOrderItemsError, setUserOrderItemsError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (cartAddMessage) {
      const timer = setTimeout(() => {
        setCartAddMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartAddMessage]);

  useEffect(() => {
    if (cartDeleteMessage) {
      const timer = setTimeout(() => {
        setCartDeleteMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartDeleteMessage]);

  useEffect(() => {
    if (cartIncDecMessage) {
      const timer = setTimeout(() => {
        setCartIncDecMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartIncDecMessage]);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        if (token) {
          const response = await checkLogin()
          setLoggedIn(true)
          setUsername(response.data.username)
        }
        else {
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch (error) {
        console.log("Check logged user error from app", error)
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser()
  }, [token])

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        await logoutRun({ "refresh": refreshToken })
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
        console.log("Log out successful!")
      }
    }
    catch (errorLogOut) {
      console.errorLogOut("Failed to logout", errorLogOut.response?.data || errorLogOut.message)
    }
  }

  useEffect(() => {
    const downloadProducts = async () => {
      setIsLoadingProducts(true);
      setFetchProductsError(null);
      try {
        const response = await fetchProducts();
        setProducts(response.data)
      } catch (fetchProductsError) {
        setFetchProductsError(fetchProductsError.message);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    downloadProducts();
  }, []);

  useEffect(() => {
    const downloadCart = async () => {
      try {
        const response = await fetchCart();
        setCartProducts(response.data);
        setcartError([]);
      } catch (cartError) {
        setcartError(cartError.message);
      }
    }
    downloadCart();
  }, [setCartProducts, token])

  const addCart = async (quantity) => {
    try {
      const response = await attachCart(
        selectedProduct.id, { qty: quantity });
      setCartAddMessage(response.data.message);
      updateCart();
    }
    catch (cartAddError) {
      setCartAddError(cartAddError.message);
    }
  }

  const cartIncDec = async (cartProductId, cartQty) => {
    try {
      const response = await incDecCart(
        cartProductId, { qty: cartQty });
      setCartIncDecMessage(response.data.message);
      updateCart(response);
    }
    catch (cartAddError) {
      setCartIncDecError(cartAddError.message);
    }
  }

  const deleteCart = async (cartToBeRemoved) => {
    try {
      const response = await eraseCart(cartToBeRemoved.id);
      setCartDeleteMessage("Product deleted from cart");
      console.log("Cart Delete Message", cartDeleteMessage)
      updateCart(response);
    } catch (cartDeleteError) {
      console.log("Error deleting product from cart", cartDeleteError)
      setCartDeleteError(cartDeleteError.message);
    }
  }

  const updateCart = async () => {
    try {
      const response = await actualizeCart();
      setCartProducts(response.data);
    } catch (cartUpdateError) {
      console.log(cartUpdateError)
      setCartUpdateError(cartUpdateError.message);
    }
  }

  const createOrderFromCart = async () => {
    try {
      const response = await createOrder();
      setCreateOrderFromCartMessage(response.data);
      setCreateOrderFromCartError(null);
      console.log("createOrderFromCart Message", response.data);
      updateCart();
    } catch (createOrderFromCartError) {
      setCreateOrderFromCartError(createOrderFromCartError.message);
      setCreateOrderFromCartMessage(null);
    }
  }


  const userOrderItems = async (order) => {
    setUserOrderItemsError(null)
    try {
      const response = await orderIdItems(order);
      setOrderItems(response.data);
    } catch (userOrderItemsError) {
      setUserOrderItemsError(userOrderItemsError.message);
    }
  }

  const userOrders = async () => {
    setOrdersError(null);
    try {
      const response = await ordersByUser();
      setOrders(response.data);
      console.log("User orders", response)
    } catch (ordersError) {
      console.log("Error user orders", ordersError)
      setOrdersError(ordersError.message);
    }
  }

  const getUsername = user => {
    setUsername(user);
  }

  const getLoggedIn = log => {
    setLoggedIn(log);
  }

  const productClicked = item => {
    console.log("Selected product", item)
    setSelectedProduct(item);
    setQuantity(1);
  }

  const addCartButton = (quantity) => {
    addCart(quantity);
  }

  const plusCartButton = (cart) => {
    let cartProductId = cart.product
    let cartQty = ++cart.qty
    cartIncDec(cartProductId, cartQty)
  }

  const minusCartButton = (cart) => {
    let cartProductId = cart.product
    let cartQty = --cart.qty
    cartIncDec(cartProductId, cartQty)
  }

  const cartClicked = (cart) => {
    const temporal = cart.product
    delete cart.id;
    delete cart.product;
    cart.id = temporal;
    console.log(cart);
    setSelectedProduct(cart);
    setQuantity(1);
  }

  const removeCart = cartDelete => {
    deleteCart(cartDelete);
  }

  const setQuantitySelect = quantitySelect => {
    setQuantity(quantitySelect);
  }

  const createBuyOrder = () => {
    createOrderFromCart();
  }

  const getUserOrders = () => {
    userOrders();
  }

  const getOrderItems = (order) => {
    userOrderItems(order)
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Header
          isLoggedIn={isLoggedIn}
          cartProducts={cartProducts}
          handleLogout={handleLogout}
          getUserOrders={getUserOrders}
        />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route index element={
            <Home
              getUsername={getUsername}
              username={username}
              getLoggedIn={getLoggedIn}
              isLoggedIn={isLoggedIn}
              isLoadingProducts={isLoadingProducts}
              products={products}
              productClicked={productClicked}
              fetchProductsError={fetchProductsError}
            />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={
            <ProductDetails
              isLoggedIn={isLoggedIn}
              selectedProduct={selectedProduct}
              addCartButton={addCartButton}
              setQuantitySelect={setQuantitySelect}
              quantity={quantity}
              cartAddMessage={cartAddMessage}
              cartAddError={cartAddError}
              cartUpdateError={cartUpdateError}
            />}
          />
          <Route path="/cart" element={
            <Cart
              cartProducts={cartProducts}
              removeCart={removeCart}
              cartDeleteMessage={cartDeleteMessage}
              cartDeleteError={cartDeleteError}
              cartIncDecMessage={cartIncDecMessage}
              cartIncDecError={cartIncDecError}
              cartError={cartError}
              products={products}
              plusCartButton={plusCartButton}
              minusCartButton={minusCartButton}
              cartClicked={cartClicked}
              createBuyOrder={createBuyOrder}
            />} />
          <Route path="/order" element={
            <Order
              createOrderFromCartMessage={createOrderFromCartMessage}
              createOrderFromCartError={createOrderFromCartError}
              getOrderItems={getOrderItems}
            />} />
          <Route path="/orders" element={
            <Orders
              orders={orders}
              getOrderItems={getOrderItems}
              ordersError={ordersError}
            />} />
          <Route path="/order-items" element={
            <OrderItems
              orderItems={orderItems}
              userOrderItemsError={userOrderItemsError}
            />} />
          <Route path="/user" element={
            <User
              username={username}
              getUserOrders={getUserOrders}
              handleLogout={handleLogout}
            />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;