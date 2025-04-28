import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import AboutUs from './screens/AboutUs';
import { Collection } from './screens/Collection';
import { ProductScreen } from './screens/Product';
import Coupons from './screens/Coupons';
import FAQs from './screens/FAQs';
import LoginOrRegister from './screens/LoginOrRegister';
import MyOrders from './screens/Orders';
import MyProfile from './screens/UserProfile';
import StoreAddress from './screens/StoreAddress';
import TermsAndPolicy from './screens/TermsOfService';
import CartScreen from './screens/CartScreen';
import OrderSuccess from './screens/OrderSuccess';
import SearchScreen from './screens/SearchScreen';
import SellerChat from './screens/SellerChat';
import MakePayment from './screens/MakePayment';
import OrderHistory from './screens/OrderHistory';
import OrderDetails from './screens/OrderDetails';
import Layout from './components/Layout';
import SellerScreen from './screens/SellerDetails/SellerScreen';
import SellerListingPage from './screens/SellerListing/SellerListingPage';
import FavoriteSellerListing from './screens/SellerListing/FavoriteSellerListing';
import SearchResults from './screens/SearchScreen/SearchResults';
import SellerPayments from './screens/SellerDetails/SellerPayments';
import OrderSuccess2 from './screens/OrderSuccess/OrderSuccess2';

function App() {
  const hostname = window.location.hostname;
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-success2" element={<OrderSuccess2 />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order/:orderCode" element={<OrderDetails />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/search/:input" element={<SearchResults />} />
          <Route path="/collection/:slug" element={<Collection />} />
          <Route path="/seller-chat/:seller" element={<SellerChat />} />
          <Route path="/seller/:sellerId" element={<SellerScreen />} />
          <Route
            path="/seller/:sellerId/payments"
            element={<SellerPayments />}
          />
          <Route path="/sellers" element={<SellerListingPage />} />
          <Route path="/favourites" element={<FavoriteSellerListing />} />
          <Route path="/make-payment" element={<MakePayment />} />
          <Route path="/product/:productSlug" element={<ProductScreen />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/login-or-register" element={<LoginOrRegister />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/user-profile" element={<MyProfile />} />
          <Route path="/store-address" element={<StoreAddress />} />
          <Route path="/terms-and-policy" element={<TermsAndPolicy />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
