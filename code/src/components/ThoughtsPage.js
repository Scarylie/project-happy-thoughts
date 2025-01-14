/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState, useEffect } from 'react';

import { ThoughtsForm } from './ThoughtsForm';
import { ThoughtsList } from './ThoughtsList';
import { LoadingPage } from './LoadingPage';

const API_URL =
  'https://project-happy-thoughts-api-yx6zp5dfjq-lz.a.run.app/thoughts';

export const ThoughtsPage = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');
  const [newName, setNewName] = useState('');

  const fetchThoughts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((data) => data.json())
      .then((transformedData) => setThoughts(transformedData))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // useEffect with empty array [] call your functions on application start
  useEffect(() => {
    fetchThoughts();
  }, []);

  const onNewNameChange = (event) => {
    setNewName(event.target.value);
  };
  const onNewThoughtChange = (event) => {
    setNewThought(event.target.value);

    console.log(event);
  };

  // This code empties the form
  const handleFormCleanup = () => {
    setNewThought('');
    setNewName('');
    setLoading(false);
  };

  const onThoughtPost = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: newName,
        message: newThought,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading(true);
    fetch(API_URL, options)
      .then((data) => data.json())
      .then(() => fetchThoughts())
      .catch((error) => console.error(error))
      .finally(() => handleFormCleanup());
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="main-container">
      <ThoughtsForm
        newName={newName}
        newThought={newThought}
        onNewNameChange={onNewNameChange}
        onNewThoughtChange={onNewThoughtChange}
        onThoughtPost={onThoughtPost}
      />
      <ThoughtsList thoughts={thoughts} fetchThoughts={fetchThoughts} />
    </div>
  );
};
