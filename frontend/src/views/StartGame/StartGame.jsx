import Axios from "axios";
import { Navbar } from "components";
import { useEffect, useState } from "react";

export function StartGame() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () =>
    Axios.get("/categories")
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
    <div className="w-full h-screen bg-white dark:bg-gray-800 justify-center">
      <Navbar label="Game Settings" onBackClickPath="/" />
      
      <div>
        <h2 className="text-2xl font-bold text-center">Kategorier</h2>
        <ul>
          {categories.map((category) => (
            <>
              <input type="checkbox" value={category.name} />
              <label class="ml-2">{category.name}</label>
              <br></br>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
