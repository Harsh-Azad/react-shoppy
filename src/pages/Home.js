import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/ProductList/components/ProductList";
import Footer from "../features/common/Footer";

function Home() {
    return ( 
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default Home;