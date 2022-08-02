const CharListItem = ({ thumbnail, name, imgStyle }) => (
  <li className="char__item">
    <img src={thumbnail} alt={name} style={imgStyle} />
    <div className="char__name">{name}</div>
  </li>
)

export default CharListItem
