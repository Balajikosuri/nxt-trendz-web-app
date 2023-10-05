import './index.css'
import CartContext from '../../context/CartContext'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {title, brand, imageUrl, rating, price} = productDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <li className="similar-product-item">
            <img
              src={imageUrl}
              className="similar-product-img"
              alt={`similar product ${title}`}
            />
            <p
              className={`similar-product-title ${
                isDarkTheme && 'dark-mode-blue'
              }`}
            >
              {title}
            </p>
            <p
              className={`similar-products-brand ${
                isDarkTheme && 'dark-mode-font-clr'
              }`}
            >
              by {brand}
            </p>
            <div className="similar-product-price-rating-container">
              <p
                className={`similar-product-price ${
                  isDarkTheme && 'dark-mode-bold-font-clr'
                }`}
              >
                Rs {price}/-
              </p>
              <div className="similar-product-rating-container">
                <p className="similar-product-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="similar-product-star"
                />
              </div>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default SimilarProductItem
