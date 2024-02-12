import { useState } from 'react';
import ChangeEvent from '../interfaces/changeEvent';
import tmdbTypes from '../interfaces/tmdbTypes';
import "../styles/radioButtons.css"


interface Props {
  onSearchResults: (results: tmdbTypes[]) => void;
  onChange: (e: ChangeEvent) => void;
}


const SearchMovie = ({ onSearchResults, onChange }: Props) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('Movie');

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/${searchType.toLowerCase()}?api_key=60593d1afc6977ce7535303358ef980d&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      onSearchResults(data.results);
      console.log(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    setSearchType(e.target.value);
    onChange(e);
  };

  return (
    <div className='flex justify-center ml-3  max-md:ml-0'>
      <form
        onSubmit={searchMovies}
        className='flex flex-col items-center w-[70%]'>
        <div className='mb-3'>
          <label htmlFor='query' />
          <input
            className='w-[400px] px-3 py-1 rounded-3xl bg-indigo-900 border-2 border-indigo-500 max-sm:w-[300px]'
            type='text'
            name='query'
            placeholder='Search for a movie, actor'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div >
          <input
            name='search-type'
            type='radio'
            id='movies-radio'
            value='Movie'
            onChange={handleChange}
            defaultChecked
            className='radio'
          />
          <label htmlFor='movies-radio' className='mr-3'>Movies</label>
          <input
            name='search-type'
            type='radio'
            id='tvseries-radio'
            value='TV'
            onChange={handleChange}
            className='radio'
          />
          <label htmlFor='tvseries-radio' className='mr-3'>TV Series</label>
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchMovie;
