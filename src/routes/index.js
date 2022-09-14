import Home from '~/pages/Home';
import Blogs from '~/pages/Blogs';
import AboutUs from '~/pages/AboutUs';
import Gallery from '~/pages/Gallery';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/blogs', component: Blogs },
    { path: '/about-us', component: AboutUs },
    { path: '/gallery', component: Gallery },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
