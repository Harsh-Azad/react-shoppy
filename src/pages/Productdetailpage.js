import Navbar from "../features/Navbar/Navbar";
import Productdetail from "../features/ProductList/components/Productdetail";
import Footer from "../features/common/Footer";

function Productdetailpage() {
    return ( 
        <div>
            <Navbar>
                <Productdetail></Productdetail>
            </Navbar>
            <Footer></Footer>
        </div>
     );
}

export default Productdetailpage;