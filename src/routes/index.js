import Home from '~/pages/Home';
import Blogs from '~/pages/Blogs';
import AboutUs from '~/pages/AboutUs';
import Gallery from '~/pages/Gallery';
import ProductDetail from '~/pages/ProductDetail';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:slug', component: ProductDetail },
    { path: '/blogs', component: Blogs },
    { path: '/about-us', component: AboutUs },
    { path: '/gallery', component: Gallery },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
