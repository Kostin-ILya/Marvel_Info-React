const CharListItem = ({ thumbnail, name, imgStyle, onCharSelected }) => (
  <li className="char__item" role="presentation" onClick={onCharSelected}>
    <img src={thumbnail} alt={name} style={imgStyle} />
    <div className="char__name">{name}</div>
  </li>
)

export default CharListItem
