import { useEffect, useState } from "react";
import "./App.css";
import { PAGE_SIZE } from "./constants";
import Pagination from "./components/Pagination";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
    console.log(products);
  };

  const handlePageChange = async (n) => {
    setCurrentPage(n);
  };

  const handlePagePrev = () => {
    setCurrentPage((prev) => (prev - 1) % noOfPages);
  };

  const handlePageNext = () => {
    setCurrentPage((prev) => (prev + 1) % noOfPages);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div>
      <h1>Pagination</h1>
      <Pagination
        handlePagePrev={handlePagePrev}
        handlePageNext={handlePageNext}
        currentPage={currentPage}
        noOfPages={noOfPages}
        handlePageChange={handlePageChange}
      />
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.images[0]} title={p.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
