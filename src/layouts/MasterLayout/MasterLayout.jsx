import { ToastContainer } from 'react-toastify';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import TopLoading from '~/components/TopLoading';

function MasterLayout({ children }) {
    return (
        <>
            <Header />
            <TopLoading />
            {children}
            <ToastContainer />
            <Footer />
        </>
    );
}

export default MasterLayout;
