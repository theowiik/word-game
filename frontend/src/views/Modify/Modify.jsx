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

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <Container>
        <div className="w-full  py-20">
          <h1 className="font-bold text-center text-3xl">
            Modify words and categories
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AddWordsCard availableCategories={categories} currentWords={words} />
          <AddCategoriesCard currentCategories={categories} />
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

const ListItem = ({ children }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg mt-2 flex justify-between">
      {children}
    </div>
  );
};

const AddWordsCard = ({ availableCategories, currentWords }) => {
  return (
    <ModifyCard label="Words">
      {currentWords.map((word) => {
        return (
          <ListItem>
            <span>{word.word}</span>
            <span>{word.description}</span>
            <select
              name="category"
              id="category"
              className="bg-transparent"
              defaultValue="cat1" //TODO: Check what category it belongs to
            >
              {availableCategories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
            </select>
          </ListItem>
        );
      })}
    </ModifyCard>
  );
};

const AddCategoriesCard = ({ currentCategories }) => {
  return (
    <ModifyCard label="Categories">
      {currentCategories.map((category) => {
        return (
          <ListItem>
            <span>{category.name}</span>
          </ListItem>
        );
      })}
    </ModifyCard>
  );
};
