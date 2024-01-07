import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/slices/errorSlice'
import { FaSpinner } from 'react-icons/fa'
import {
  addBook,
  fetchBook,
  selectIsLoadingAPI,
} from '../../redux/slices/booksSlice'
import createBookWithId from '../../utilFunctions/createBookWithId'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const isLoadingAPI = useSelector(selectIsLoadingAPI)
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const bookIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[bookIndex]
    const randomBookWithId = createBookWithId(randomBook)
    dispatch(addBook(randomBookWithId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author })))
      setTitle('')
      setAuthor('')
    } else {
      dispatch(setError('Title and author are required'))
    }
  }

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook(import.meta.env.VITE_API_URL))
  }

  return (
    <div className='app-block book-form'>
      <h2>Add new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type='submit' onClick={handleSubmit}>
          Add book
        </button>
        <button onClick={handleAddRandomBook} type='button'>
          Add random book
        </button>

        <button
          onClick={handleAddRandomBookViaAPI}
          type='button'
          disabled={isLoadingAPI}
        >
          {isLoadingAPI ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className='spinner' />
            </>
          ) : (
            'Add random book via API'
          )}
        </button>
      </form>
    </div>
  )
}

export default BookForm
