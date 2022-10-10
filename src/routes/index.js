import AboutUs from '~/pages/AboutUs';
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
    { path: '/login', component: Login },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/product-category/:type', component: ProductCategory },
    { path: '/register', component: Register },
    { path: '/search', component: SearchResult },
    { path: '*', component: PageNotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
