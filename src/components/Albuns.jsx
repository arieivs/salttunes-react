import Album from './Album'

function Albuns(props) {
  const albunsColumns = props.albunsData.map(album => {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 py-3" key={album.id}>
        <Album album={album} />
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">
        {albunsColumns}
      </div>
    </div>
  )
}

export default Albuns;
