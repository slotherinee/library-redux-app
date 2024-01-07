import { useSelector, useDispatch } from 'react-redux'
import { deleteBook, toggleFavorite } from '../../redux/slices/booksSlice'
import {
  selectAuthorFilter,
  selectTitleFilter,
  selectOnlyFavoritesFilter,
} from '../../redux/slices/filterSlice'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import './BookList.css'

const BookList = () => {
  const books = useSelector((state) => state.books.books)
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoritesFilter)

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase())
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesTitle && matchesAuthor && matchesFavorite
  })

  const highlightWord = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, 'gi')
    return text.split(regex).map((chunk, i) => {
      if (chunk.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className='highlight'>
            {chunk}
          </span>
        )
      }
      return chunk
    })
  }

  return (
    <div className='app-block book-list'>
      <h2>Book list</h2>
      {books.length === 0 ? (
        <p>Book list is empty for now</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={i}>
              <div className='book-info'>
                {++i}. {highlightWord(book.title, titleFilter)} by{' '}
                <strong>{highlightWord(book.author, authorFilter)}</strong>
              </div>
              <div className='book-actions'>
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className='star-icon' />
                  ) : (
                    <BsBookmarkStar className='star-icon' />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
