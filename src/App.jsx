import React from "react"
import './App.css';
import Header from './components/Header'
import Albuns from './components/Albuns'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      albunsData:[],
      search: false,
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true})
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(data => {
        const dataClean = data.feed.entry.map(entry => {
          return {
            id: entry.id.attributes['im:id'],
            title: entry['im:name'].label,
            artist: entry['im:artist'].label,
            url: entry.id.label,
            coverURL: entry['im:image'][2].label
          }
        })
        this.setState({ loading: false, albunsData: dataClean })
      })
  }

  handleChange(event) {
    this.setState({ search: true, searchValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleClick() {
    this.setState({search: false, searchValue: ''})
  }

  render() {
    let albunsDisplay = this.state.albunsData
    if (this.state.search) {
      albunsDisplay = this.state.albunsData.filter(album => {
        return album.title.toLowerCase().includes(this.state.searchValue.toLowerCase()) || album.artist.toLowerCase().includes(this.state.searchValue.toLowerCase())
      })
    }

    let content
    if (this.state.loading) {
      content = <h2 className="text-center py-5">Getting some coffee...</h2>
    } else if (albunsDisplay.length === 0) {
      content = <h2 className="text-center py-5">We couldn't find what you're looking for...</h2>
    } else {
      content = <Albuns albunsData={albunsDisplay}/>
    }

    return (
      <div >
        <Header />
        <main className="wrapper">
          <div className="d-flex flex-column flex-md-row my-5">
            <form onSubmit={this.handleSubmit} className="d-flex flex-grow-1">
              <input type="text" placeholder="Search for an Album or Artist" value={this.state.searchValue} onChange={this.handleChange} className="search-bar flex-grow-1 me-2"/>
              <input type="submit" value="Search" className="btn-all btn-prim" />
            </form>
            <div className="border-btn">
              <button onClick={this.handleClick} className="btn-all btn-sec">Clear Search</button>
            </div>
          </div>
          {content}
        </main>
      </div>
    );
  }
}

export default App;
