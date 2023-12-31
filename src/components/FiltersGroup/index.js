import {BsSearch} from 'react-icons/bs'

import './index.css'
import CartContext from '../../context/CartContext'

const FiltersGroup = props => (
  <CartContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const renderRatingsFiltersList = () => {
        const {ratingsList} = props

        return ratingsList.map(rating => {
          const {changeRating, activeRatingId} = props
          const ratingClassName =
            activeRatingId === rating.ratingId
              ? `and-up active-rating`
              : `and-up`

          const onClickRatingItem = () => changeRating(rating.ratingId)

          return (
            <li
              className={`rating-item ${ratingClassName}`}
              key={rating.ratingId}
              onClick={onClickRatingItem}
            >
              <img
                src={rating.imageUrl}
                alt={`rating ${rating.ratingId}`}
                className="rating-img"
              />
              <p>& up</p>
            </li>
          )
        })
      }

      const renderRatingsFilters = () => (
        <div>
          <h1 className={`rating-heading ${isDarkTheme && 'dark-mode-blue'}`}>
            Rating
          </h1>
          <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
        </div>
      )

      const renderCategoriesList = () => {
        const {categoryOptions} = props

        return categoryOptions.map(category => {
          const {changeCategory, activeCategoryId} = props
          const onClickCategoryItem = () => changeCategory(category.categoryId)
          const isActive = category.categoryId === activeCategoryId
          const categoryClassName = isActive
            ? `category-name active-category-name`
            : `category-name`

          return (
            <li
              className={`category-item `}
              key={category.categoryId}
              onClick={onClickCategoryItem}
            >
              <p
                style={{color: isDarkTheme && '#fff'}}
                className={categoryClassName}
              >
                {category.name}
              </p>
            </li>
          )
        })
      }

      const renderProductCategories = () => (
        <>
          <h1 className={`category-heading ${isDarkTheme && 'dark-mode-blue'}`}>
            Category
          </h1>
          <ul className="categories-list">{renderCategoriesList()}</ul>
        </>
      )

      const onEnterSearchInput = event => {
        const {enterSearchInput} = props
        if (event.key === 'Enter' || event.target.value === '') {
          enterSearchInput()
        }
      }

      const onChangeSearchInput = event => {
        const {changeSearchInput} = props
        changeSearchInput(event.target.value)
      }

      const renderSearchInput = () => {
        const {searchInput} = props
        return (
          <div className="search-input-container">
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={onChangeSearchInput}
              onKeyDown={onEnterSearchInput}
            />
            <BsSearch className="search-icon" />
          </div>
        )
      }

      const {clearFilters} = props

      return (
        <div className="filters-group-container">
          {renderSearchInput()}
          {renderProductCategories()}
          {renderRatingsFilters()}
          <button
            type="button"
            className="clear-filters-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default FiltersGroup
