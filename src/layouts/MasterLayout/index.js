import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

function MasterLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default MasterLayout;
