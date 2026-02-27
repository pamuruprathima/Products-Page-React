import { useState } from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header onSearch={setSearch} />

      <ProductList searchText={search} />
    </>
  );
};

export default ProductsPage;