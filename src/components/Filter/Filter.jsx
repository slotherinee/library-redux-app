import { useSelector, useDispatch } from 'react-redux'
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoritesFilter,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoritesFilter,
  resetFilters,
} from '../../redux/slices/filterSlice'

import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoritesFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoritesFilter())
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className='app-block filter'>
      <div className='filter-row'>
        <div className='filter-group'>
          <input
            type='text'
            value={titleFilter}
            onChange={handleTitleFilterChange}
            placeholder='Filter by title'
          />
        </div>
        <div className='filter-group'>
          <input
            type='text'
            value={authorFilter}
            onChange={handleAuthorFilterChange}
            placeholder='Filter by author'
          />
        </div>
        <div className='filter-group'>
          <label htmlFor='favorites'>
            <input
              type='checkbox'
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
              name='favorites'
              id='favorites'
            />
            Only Favorite
          </label>
        </div>
        <button
          type='button'
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default Filter
