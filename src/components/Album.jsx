import './Album.css'

function Album(props) {
  return (
    <div className="cell">
      <a href={props.album.url} target="_blank" rel="noreferrer" className="link">
        <div className="cover">
          <img src={props.album.coverURL} alt="" />
          <button className="btn-all btn-prim play">Play</button>
        </div>
        <h2 className="title">{props.album.title}</h2>
        <p className="artist">{props.album.artist}</p>
      </a>
    </div>
  )
}

export default Album;
