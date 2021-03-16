import Axios from 'axios';
import { Container, Navbar } from 'components';
import { Button } from 'components/Button/Button';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';


/**
 * The view for starting a new game, includes selecting a category for the page.
 * @returns {JSX.Element}
 * @constructor
 */
export function StartGame() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const fetchCategories = () =>
    Axios.get('/categories')
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  const handleStartGame = (event) => {
    event.preventDefault();
    const chosenCategory = event.target.category.value;
    const form = new FormData();
    form.append('category', chosenCategory) 

    Axios.post(`/games/`, form)
      .then((res) => {
        console.log(res);
        history.push(`/game/${res.data.pin}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen  text-white bg-gray-800 justify-center">
      <Navbar label="Game Settings" onBackClickPath="/" />

      <Container>
        <form
          onSubmit={handleStartGame}
          className="flex flex-col justify-center items-center"
        >
          <div className="bg-gray-700 rounded-xl w-full sm:w-96 p-10 mt-20">
          <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-bold">Select category</h2>
          <Link to="/modify">
          <button className="px-5 py-2 bg-gray-600 hover:bg-gray-800 rounded-full">Edit</button>
          </Link>
          
          </div>
            
            <ul className="mt-5">
              {categories.map((category, index) => (
                <div key={`category-${index}`}>
                  <input
                    id="category"
                    name="category"
                    type="radio"
                    value={category.name}
                  />
                  <label className="ml-2 font-bold uppercase">{category.name}</label>
                  <br/>
                </div>
              ))}
            </ul>
          </div>
          <div className="mt-14">
            <Button primary label="Create Game" type="submit" />
          </div>
        </form>
      </Container>
    </div>
  );
}
