import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  onSearch: (text: string) => void;
}

const Header = ({ onSearch }: Props) => {

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const userName = localStorage.getItem("userName") || "User";

  /* FIXED LOGOUT */
  const handleLogout = () => {

    // REMOVE ONLY USER INFO
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // DO NOT REMOVE PRODUCTS

    navigate("/");
  };

  const handleSearch = (e: any) => {

    const value = e.target.value;

    setSearchText(value);

    onSearch(value);
  };

  return (

    <div style={styles.navbar}>

      <h2 style={styles.logo}>🛍 ShopVerse</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={handleSearch}
        style={styles.search}
      />

      <div>

        <span style={{ marginRight: "15px" }}>
          Welcome, {userName}
        </span>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>

      </div>

    </div>

  );
};

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2874f0",
    color: "white",
    padding: "10px 20px",
  },

  logo: {
    margin: 0,
  },

  search: {
    width: "300px",
    padding: "5px",
    borderRadius: "4px",
    border: "none",
  },

  logout: {
    background: "white",
    color: "#2874f0",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },

};

export default Header;