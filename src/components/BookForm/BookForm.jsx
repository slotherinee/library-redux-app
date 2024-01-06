import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook } from '../../redux/slices/booksSlice'
import createBookWithId from '../../utilFunctions/createBookWithId'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
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
    }
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
        <button
          type='submit'
          onClick={handleSubmit}
        >
          Add book
        </button>
        <button
          onClick={handleAddRandomBook}
          type='button'
        >
          Add random book
        </button>
      </form>
    </div>
  )
}

export default BookForm
