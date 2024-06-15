import { Link } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/ProductList/components/ProductList";

function Home() {
    return ( 
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            
        </div>
     );
}

export default Home;