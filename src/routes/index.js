import Home from '~/pages/Home';
import Blogs from '~/pages/Blogs';
import AboutUs from '~/pages/AboutUs';
import Gallery from '~/pages/Gallery';
import ProductDetail from '~/pages/ProductDetail';
import PageNotFound from '~/pages/PageNotFound';
import Checkout from '~/pages/Checkout';
import ProductCategory from '~/pages/ProductCategory';
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

const privateRoutes = [];

export { publicRoutes, privateRoutes };
