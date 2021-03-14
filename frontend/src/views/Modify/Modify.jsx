import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'components';

export const Modify = () => {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);

  const fetchCategories = () =>
    axios
      .get('/categories')
      .then((res) => {
        if (Array.isArray(res.data)) setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  const fetchWords = () =>
    axios
      .get('/words')
      .then((res) => {
        if (Array.isArray(res.data)) setWords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  useEffect(() => {
    fetchCategories();
    fetchWords();
  }, []);

  const handleNewCategory = (category) => {
    //Add to state
    setCategories((current) => [...current, category]);
    //add to db
    console.log(category);
  };

  const handleNewWord = (word) => {
    //Add to state
    setWords((current) => [...current, word]);
    //add to db
    console.log(words);
  };

  const handleUpdateWord = (index, newData) => {
    console.log(`Update index: ${index} with:`);
    console.log(newData)
  };

  const handleUpdateCategory = (index, newData) => {
    console.log(`Update index: ${index} with:`);
    console.log(newData)
    
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <Container>
        <div className="w-full  py-20">
          <h1 className="font-bold text-center text-3xl">
            Modify words and categories
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AddWordsCard
            availableCategories={categories}
            currentWords={words}
            onNewWord={handleNewWord}
            onUpdateWord={handleUpdateWord}
          />
          <AddCategoriesCard
            currentCategories={categories}
            onNewCategory={handleNewCategory}
            onUpdateCategory={handleUpdateCategory}
          />
        </div>
      </Container>
    </div>
  );
};

const ModifyCard = ({ children, label }) => {
  return (
    <div className="col-span-full lg:col-span-1 bg-gray-900 p-10 rounded-xl">
      <h1 className="font-bold  text-xl">{label}</h1>
      {children}
    </div>
  );
};

const ListItem = ({ children, editing = false }) => {
  return (
    <div
      className={`w-full p-4 ${
        editing ? 'bg-gray-700' : 'bg-gray-800'
      } rounded-lg mt-2 flex justify-between`}
    >
      {children}
    </div>
  );
};

const WordListItem = ({ word, index, onUpdate, availableCategories }) => {
  const [editing, setEditing] = useState(false);

  const handleSubmit = (event) => {
    onUpdate(event, index);
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <ListItem editing={editing}>
        <input
          name="currentWord"
          id="currentWord"
          className="bg-transparent"
          defaultValue={word.word}
          onChange={() => setEditing(true)}
        />
        <input
          name="currentDescription"
          id="currentDescription"
          className="bg-transparent"
          defaultValue={word.description}
          onChange={() => setEditing(true)}
        />

        <select
          name="currentCategory"
          id="currentCategory"
          className="bg-transparent"
          onChange={() => setEditing(true)}
          defaultValue="cat1" //TODO: Check what category it belongs to
        >
          {availableCategories.map((category) => {
            return <option value={category.name}>{category.name}</option>;
          })}
        </select>
      </ListItem>
      {editing && (
        <button
          type="submit"
          className="bg-green-500 mt-2 px-2 ml-2 rounded-lg"
        >
          Update
        </button>
      )}
    </form>
  );
};

const AddWordsCard = ({
  availableCategories,
  currentWords,
  onNewWord,
  onUpdateWord,
}) => {
  const handleNewWord = (event) => {
    event.preventDefault();
    const word = {
      word: event.target.word.value,
      description: event.target.description.value,
      category: event.target.category.value,
    };
    onNewWord(word);
    var form = document.getElementById('newWordForm');
    form.reset();
  };

  const handleUpdateWord = (event, index) => {
    event.preventDefault();
    const newData = {
      word: event.target.currentWord.value,
      description: event.target.currentDescription.value,
      category: event.target.currentCategory.value,
    };
    onUpdateWord(index, newData);
  };

  return (
    <ModifyCard label="Words">
      {currentWords.map((word, index) => {
        return (
          <WordListItem
            word={word}
            index={index}
            onUpdate={handleUpdateWord}
            availableCategories={availableCategories}
          />
        );
      })}
      <div className="h-px bg-gray-800 mt-10" />
      <form id="newWordForm" onSubmit={handleNewWord} className="mt-5">
        <h3>Add new word</h3>
        <div className="flex justify-between">
          <input
            name="word"
            id="word"
            className="bg-gray-800 p-2 rounded-lg w-full mr-4"
            placeholder="Word"
          />
          <input
            name="description"
            id="description"
            className="bg-gray-800 p-2 rounded-lg w-full mr-4"
            placeholder="Description"
          />
          <select
            name="category"
            id="category"
            className="bg-gray-800 p-2 rounded-lg w-full"
          >
            {availableCategories.map((category) => {
              return <option value={category.name}>{category.name}</option>;
            })}
          </select>
          <button
            type="submit"
            className="py-2 px-5 bg-yellow-500 rounded-lg ml-5"
          >
            Add
          </button>
        </div>
      </form>
    </ModifyCard>
  );
};

const CategoryListItem = ({ category, index, onUpdate }) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();

    const newData = {
      name: event.target.currentCategory.value,
    };
    onUpdate(index, newData);
    setEditing(false)
  };

  return (
    <form onSubmit={handleUpdate} className="flex">
      <ListItem editing={editing}>
        <input
          name="currentCategory"
          id="currentCategory"
          className="bg-transparent w-full"
          onChange={() => setEditing(true)}
          defaultValue={category.name}
        />
      </ListItem>
      {editing && (
        <button
          type="submit"
          className="bg-green-500 mt-2 px-2 ml-2 rounded-lg"
        >
          Update
        </button>
      )}
    </form>
  );
};

const AddCategoriesCard = ({
  currentCategories,
  onNewCategory,
  onUpdateCategory,
}) => {
  const handleNewCategory = (event) => {
    event.preventDefault();
    const category = event.target.newCategory.value;
    onNewCategory({ name: category });
    var form = document.getElementById('newCategoryForm');
    form.reset();
  };

  return (
    <ModifyCard label="Categories">
      {currentCategories.map((category, index) => {
        return (
          <CategoryListItem
            index={index}
            onUpdate={onUpdateCategory}
            category={category}
          />
        );
      })}

      <div className="h-px bg-gray-800 mt-10" />
      <form id="newCategoryForm" onSubmit={handleNewCategory} className="mt-5">
        <h3>Add new category</h3>
        <div className="flex justify-between">
          <input
            name="newCategory"
            id="newCategory"
            className="bg-gray-800 p-2 rounded-lg w-full"
            placeholder="Category name"
          />
          <button
            type="submit"
            className="py-2 px-5 bg-yellow-500 rounded-lg ml-5"
          >
            Add
          </button>
        </div>
      </form>
    </ModifyCard>
  );
};
