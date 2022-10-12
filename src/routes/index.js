import AboutUs from '~/pages/AboutUs';
import Dashboard from '~/pages/Admin/Dashboard';
import Blogs from '~/pages/Blogs';
import Checkout from '~/pages/Checkout';
import Gallery from '~/pages/Gallery';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import PageNotFound from '~/pages/PageNotFound';
import ProductCategory from '~/pages/ProductCategory';
import ProductDetail from '~/pages/ProductDetail';
import Register from '~/pages/Register';
import SearchResult from '~/pages/SearchResult';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about-us', component: AboutUs },
    { path: '/blogs', component: Blogs },
    { path: '/checkout', component: Checkout },
    { path: '/gallery', component: Gallery },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/product-category/:type', component: ProductCategory },
    { path: '/search', component: SearchResult },
    { path: '*', component: PageNotFound },
];

const privateRoutes = [{ path: '/admin', component: Dashboard, roles: [5] }];

const restrictRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export { publicRoutes, privateRoutes, restrictRoutes };
