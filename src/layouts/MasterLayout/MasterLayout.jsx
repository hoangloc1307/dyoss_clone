import { ToastContainer } from 'react-toastify';

import TopLoading from '~/components/TopLoading';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';

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
