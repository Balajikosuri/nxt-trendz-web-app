import {BsFilterRight} from 'react-icons/bs'

import './index.css'
import CartContext from '../../context/CartContext'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId} = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="products-header">
            <h1
              className={`products-list-heading ${
                isDarkTheme && 'dark-mode-bold-font-clr'
              }`}
            >
              All Products
            </h1>
            <div className="sort-by-container">
              <BsFilterRight className="sort-by-icon" />
              <p
                className={`sort-by ${
                  isDarkTheme && 'dark-mode-bold-font-clr'
                }`}
              >
                Sort by
              </p>
              <select
                className="sort-by-select"
                value={activeOptionId}
                onChange={onChangeSortby}
              >
                {sortbyOptions.map(eachOption => (
                  <option
                    key={eachOption.optionId}
                    value={eachOption.optionId}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default ProductsHeader
