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

  const handleStartGame = (event) => {
    event.preventDefault()
    const chosenCategory = event.target.category.value
    console.log(chosenCategory)
    //Post start game with new pin
    Axios.post(`/games/${chosenCategory}`, {}).then((res) => {
      console.log("Created a new game with category " + chosenCategory)
      console.log(res)
    }).catch((err) => {
      console.log('Failed to create game')
      console.log(err)
    })

    //Redirect to lobby
    

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen  bg-white dark:text-white dark:bg-gray-800 justify-center">
      <Navbar label="Game Settings" onBackClickPath="/" />

      <Container>
        <form onSubmit={handleStartGame} className='flex flex-col justify-center items-center'>
          <div className="bg-gray-700 rounded-xl w-96 p-10 mt-20">
            <h2 className="text-2xl font-bold">Select category</h2>
            <ul className='mt-5'>
              {categories.map((category) => (
                <>
                  <input id='category' name='category' type="radio" value={category.name} />
                  <label className="ml-2">{category.name}</label>
                  <br></br>
                </>
              ))}
            </ul>
          </div>
          <div className="mt-14">
            <Button primary label="Start game" type="submit" />
          </div>
        </form>
      </Container>
    </div>
  );
}
