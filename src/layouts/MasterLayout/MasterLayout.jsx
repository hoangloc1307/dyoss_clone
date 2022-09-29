import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import Loader from '~/layouts/components/Loader';

function MasterLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Loader />
            <Footer />
        </>
    );
}

export default MasterLayout;
