import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const GameSettings = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () =>
    Axios.get("/socialgame/ws/category")
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch categories");
        console.log(err);
      });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div>
        <Link to="/">
          <a>Go back</a>
        </Link>
        <h1>Game Settings</h1>{" "}
      </div>

      <h1>Kategorier</h1>

      <ul>
        {categories.map((category) => (
          <>
            <input type="checkbox" value={category} />
            <label class="ml-2">{category}</label>
            <br></br>
          </>
        ))}
      </ul>
    </div>
  );
};

export default GameSettings;
