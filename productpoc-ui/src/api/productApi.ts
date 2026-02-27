import { Product } from "../models/Product";

const STORAGE_KEY = "products";

/* GET */
export const getProducts = async (): Promise<Product[]> => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/* CREATE */
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const products = await getProducts();

  const newProduct: Product = {
    id: Date.now(),
    ...product,
  };

  const updatedProducts = [...products, newProduct];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));

  return newProduct;
};

/* UPDATE */
export const updateProduct = async (
  updatedProduct: Product
): Promise<Product> => {
  const products = await getProducts();

  const newProducts = products.map((p) =>
    p.id === updatedProduct.id ? updatedProduct : p
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));

  return updatedProduct;
};

/* DELETE */
export const deleteProduct = async (id: number): Promise<void> => {
  const products = await getProducts();

  const newProducts = products.filter((p) => p.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
};