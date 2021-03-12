import Axios from 'axios';
import { Navbar, Container } from 'components';
import { useEffect, useState } from 'react';
import { Button } from 'components/Button/Button';

export function StartGame() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () =>
    Axios.get('/categories')
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
      })
      .catch((err) => {
        console.log('Failed to fetch categories');
        console.log(err);
      });

  const handleStartGame = () => {
    //TODO: Post start game with new pin

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen  bg-white dark:text-white dark:bg-gray-800 justify-center">
      <Navbar label="Game Settings" onBackClickPath="/" />

      <Container>
        <div className='flex flex-col justify-center items-center'>
          <div className="bg-gray-700 rounded-xl w-96 p-10 mt-20">
            <h2 className="text-2xl font-bold">Select category</h2>
            <ul>
              {categories.map((category) => (
                <>
                  <input type="radio" value={category.name} />
                  <label class="ml-2">{category.name}</label>
                  <br></br>
                </>
              ))}
            </ul>
          </div>
          <div className="mt-14">
            <Button primary label="Start game" onClick={handleStartGame} />
          </div>
        </div>
      </Container>
    </div>
  );
}
