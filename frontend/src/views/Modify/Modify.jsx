import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    //Add to db
    axios
      .post('/categories', category)
      .then((res) => {
        toast.success('Category added');
        //Add to state
        setCategories((current) => [...current, res.data]);
      })
      .catch((err) => {
        toast.error('Failed to add category');
      });
  };

  const handleNewWord = (word) => {
    //add to db
    axios
      .post('/words', word)
      .then((res) => {
        toast.success('Word added');
        //Add to state
        setWords((current) => [...current, res.data]);
      })
      .catch((err) => {
        toast.error('Failed to add word');
      });
  };

  const handleUpdateWord = (newData) => {
    axios
      .put('/words', newData)
      .then((res) => {
        toast.success('Word updated');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update word');
      });
  };

  const handleUpdateCategory = (index, newData) => {
    axios
      .put('/categories', newData)
      .then((res) => {
        toast.success('Category updated');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to update category');
      });
  };

  const handleDeleteCategory = (category) => {
    axios
      .delete(`/categories/${category.name}`, {})
      .then((res) => {
        toast.success(`${category.name} deleted`);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handleDeleteWord = (word) => {
    axios
      .delete(`/words/${word.word}`, {})
      .then((res) => {
        toast.success(`${word.word} deleted`);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to delete word');
      });
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <Container>
        <div className="w-full  py-20">
          <h1 className="font-bold text-center text-3xl">
            Modify words and categories
          </h1>
          <div className="absolute top-10 sm:left-10">
            <Link to="/game/new">
              <span className="bg-gray-600 py-2 px-4 rounded-full text-sm ml-5">
                Back to home
              </span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AddWordsCard
            availableCategories={categories}
            currentWords={words}
            onNewWord={handleNewWord}
            onUpdateWord={handleUpdateWord}
            onDeleteWord={handleDeleteWord}
          />
          <AddCategoriesCard
            currentCategories={categories}
            onNewCategory={handleNewCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
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

const ListItem = ({
  children,
  editing = false,
  onPointerEnter,
  onPointerLeave,
}) => {
  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`w-full p-4 ${
        editing ? 'bg-gray-700' : 'bg-gray-800'
      } rounded-lg mt-2 flex justify-between`}
    >
      {children}
    </div>
  );
};

const WordListItem = ({
  word,
  onUpdate,
  onDeleteWord,
  availableCategories,
}) => {
  const [editing, setEditing] = useState(false);

  const handleSubmit = (event) => {
    onUpdate(event, word.word);
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <div
        onClick={() => onDeleteWord(word)}
        className="rounded-full bg-gray-800 p-2 h-10 w-10 mr-2 text-center bg-opacity-50 hover:bg-red-500 cursor-pointer mt-4"
      >
        x
      </div>
      <ListItem editing={editing}>
        <span className="w-24">{word.word}</span>
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
          defaultValue={word.category.name} //TODO: Check what category it belongs to
        >
          {availableCategories.map((category) => {
            return (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            );
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
  onDeleteWord,
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

  const handleUpdateWord = (event, word) => {
    event.preventDefault();
    const newData = {
      word: word,
      description: event.target.currentDescription.value,
      category: event.target.currentCategory.value,
    };
    onUpdateWord(newData);
  };

  return (
    <ModifyCard label="Words">
      <div className="pl-12 pr-8 flex justify-between w-full text-gray-600">
        <span>Word</span>
        <span className="-ml-16">Description</span>
        <span>Category</span>
      </div>
      {currentWords.map((word, index) => {
        return (
          <div key={`word-${index}`}>
            <WordListItem
              word={word}
              index={index}
              onUpdate={handleUpdateWord}
              onDeleteWord={onDeleteWord}
              availableCategories={availableCategories}
            />
          </div>
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
            {availableCategories.map((category, index) => {
              return (
                <option key={`category-${index}`} value={category.name}>
                  {category.name}
                </option>
              );
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

const CategoryListItem = ({ category, index, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();

    const newData = {
      oldName: category.name,
      newName: event.target.currentCategory.value,
    };
    onUpdate(index, newData);
    setEditing(false);
  };

  return (
    <form onSubmit={handleUpdate} className="flex">
      <div
        onClick={() => onDelete(category)}
        className="rounded-full bg-gray-800 p-2 h-10 w-10 mr-2 text-center bg-opacity-50 hover:bg-red-500 cursor-pointer mt-4"
      >
        x
      </div>
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
  onDeleteCategory,
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
          <div key={`category-${index}`}>
            <CategoryListItem
              index={index}
              onUpdate={onUpdateCategory}
              onDelete={onDeleteCategory}
              category={category}
            />
          </div>
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
