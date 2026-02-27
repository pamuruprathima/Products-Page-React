import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

interface Props {
  searchText: string;
}

const ProductList = ({ searchText }: Props) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async () => {

    if (!name || !price || !imageUrl) {
      alert("Enter all fields");
      return;
    }

    if (editingId === null) {

      await createProduct({
        name,
        price: Number(price),
        imageUrl,
      });

    } else {

      await updateProduct({
        id: editingId,
        name,
        price: Number(price),
        imageUrl,
      });

      setEditingId(null);
    }

    setName("");
    setPrice("");
    setImageUrl("");

    loadProducts();
  };

  const handleDelete = async (id: number) => {

    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id);

    loadProducts();
  };

  const handleEdit = (p: Product) => {

    setName(p.name);
    setPrice(p.price.toString());
    setImageUrl(p.imageUrl || "");
    setEditingId(p.id);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (

    <div style={{ padding: "20px" }}>

      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {/* FORM */}
      <div style={styles.form}>

        <input
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <button onClick={handleSave}>
          {editingId ? "Update" : "Add"}
        </button>

      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {filteredProducts.length === 0 ? (

          <div style={styles.empty}>
            No products found for "{searchText}"
          </div>

        ) : (

          filteredProducts.map(p => (

            <div
              key={p.id}
              style={styles.card}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
              }}

            >

              <div style={styles.imageContainer}>

                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={styles.image}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}

                />

              </div>

              <div style={styles.cardBody}>

                <h3 style={styles.title}>
                  {p.name}
                </h3>

                <p style={styles.price}>
                  ₹{p.price}
                </p>

                <div style={styles.buttonRow}>

                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

const styles = {

  form: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  empty: {
    fontSize: "22px",
    color: "#666",
    marginTop: "40px",
    textAlign: "center" as const,
    gridColumn: "1 / -1",
  },

  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },

  imageContainer: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover" as const,
    transition: "transform 0.3s ease",
  },

  cardBody: {
    padding: "10px",
  },

  title: {
    fontSize: "16px",
    margin: "5px 0",
  },

  price: {
    color: "#388e3c",
    fontWeight: "bold",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  editBtn: {
    background: "#2874f0",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },

};

export default ProductList;