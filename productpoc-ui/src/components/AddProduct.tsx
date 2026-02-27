import { useState } from "react";
import { Product } from "../models/Product";

interface Props {
  onProductAdded: (product: Omit<Product, "id">) => void;
}

const AddProduct = ({ onProductAdded }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === "") {
      alert("Please fill all fields");
      return;
    }

    onProductAdded({ name, price: Number(price) });

    setName("");
    setPrice("");
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{ display: "flex", gap: "0.5rem", padding: "1rem" }}
    >
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProduct;
