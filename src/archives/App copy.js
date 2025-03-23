import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../screens/Home';
import AboutUs from '../screens/AboutUs';
import Collection from '../screens/Collection';
import Coupons from '../screens/Coupons';
import FAQs from '../screens/FAQs';
import LoginOrRegister from '../screens/LoginOrRegister';
import MyOrders from '../screens/Orders';
import MyProfile from '../screens/UserProfile';
import PrivacyPolicy from './screens/PrivacyPolicy';
import RefundPolicy from './screens/RefundPolicy';
import ShippingPolicy from './screens/ShippingPolicy';
import StoreAddress from '../screens/StoreAddress';
import TermsAndPolicy from '../screens/TermsOfService';
import Default from './components/Default';
import SearchResults from '../screens/SearchScreen';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/collection/:slug" element={<Collection />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/login-or-register" element={<LoginOrRegister />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/user-profile" element={<MyProfile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/store-address" element={<StoreAddress />} />
        <Route path="/terms-of-service" element={<TermsAndPolicy />} />
        <Route path="/default" element={<Default />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
