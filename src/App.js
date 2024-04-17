import React, { useState } from "react";
import "./App.css";

const tempMusicData = [
  {
    id: 1,
    title: "Uptown Funk",
    artist: "Bruno Mars",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 2,
    title: "Mr Brightside",
    artist: "The Killers",
    genre: "Rock",
    userRating: 4,
  },
  {
    id: 3,
    title: "Fly Me To The Moon",
    artist: "Frank Sinatra",
    genre: "Jazz",
  },
  {
    id: 4,
    title: "In too deep",
    artist: "Sum41",
    genre: "Rock",
    userRating: 4,
  },
  {
    id: 5,
    title: "Maiden Voyage",
    artist: "Herbie Hancock",
    genre: "Jazz",
    userRating: 4,
  },
  {
    id: 6,
    title: "Padam Padam",
    artist: "Kylie Minogue",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 7,
    title: "Umbrella",
    artist: "Rihanna",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 8,
    title: "Toxic",
    artist: "Britney Spears",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 9,
    title: "Hits Different",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 10,
    title: "Rolling in the deep",
    artist: "Adele",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 11,
    title: "Torn",
    artist: "Imbruglia",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 12,
    title: "Dance the Night",
    artist: "Dua lipa",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 13,
    title: "Single Ladies",
    artist: "Beyonce",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 14,
    title: "Dancing on my own",
    artist: "Robyn",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 15,
    title: "Hey ya!",
    artist: "Outkast",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 16,
    title: "Hollaback Girl",
    artist: "Gwen stefani",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 17,
    title: "Hips don't lie",
    artist: "Miley Cyrus",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 18,
    title: "SexyBack",
    artist: "Justin timberlake",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 19,
    title: "Call me maybe",
    artist: "Carly rae jepsen",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 20,
    title: "Poker face",
    artist: "Lady gaga",
    genre: "Pop",
    userRating: 5,
  },
];

const tempPlaylist = [];

function Navbar({
  children,
  genres,
  selectedGenre,
  onSelectGenre,
  onResetSearch,
  searchQuery,
  setSearchQuery,
}) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    onResetSearch();
  };

  return (
    <nav className="navbar">
      <Logo />
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-btn" onClick={handleResetSearch}>
          Clear Search
        </button>
      </div>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
      />
      {children}
    </nav>
  );
}

function Logo() {
  return <h1 className="logo">iMusic</h1>;
}

function NumResult({ music }) {
  return (
    <p className="num-results">
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter">
      <label htmlFor="genre">Filter by Genre:</label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={(e) => onSelectGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

function MusicListBox({ music, addToPlaylist, selectedGenre, searchQuery }) {
  const filteredMusic = music.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGenre ? item.genre === selectedGenre : true),
  );

  return (
    <div className="music-list-container">
      <h2 className="section-title">Music List</h2>
      <Music music={filteredMusic} addToPlaylist={addToPlaylist} />
    </div>
  );
}

function Music({ music, addToPlaylist }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
    addToPlaylist(id);
  };

  return (
    <ul className="music-list">
      {music.map((item) => (
        <li key={item.id} className="music-item">
          {item.title} by {item.artist} ({item.genre})
          <button
            onClick={() => toggleFavorite(item.id)}
            className={
              favorites.includes(item.id)
                ? "favorite-btn active"
                : "favorite-btn"
            }
          >
            {favorites.includes(item.id) ? "❤️" : "🖤"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PlaylistBox({ playlist }) {
  return (
    <div className="playlist-container">
      <h2 className="section-title">Playlist</h2>
      <Playlist playlist={playlist} />
    </div>
  );
}

function Playlist({ playlist }) {
  return (
    <ul className="playlist">
      {playlist.map((item) => (
        <li key={item.id} className="playlist-item">
          {item.title} by {item.artist}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [music] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const genres = [...new Set(tempMusicData.map((item) => item.genre))];

  const addToPlaylist = (id) => {
    const musicToAdd = music.find((item) => item.id === id);
    if (!playlist.some((item) => item.id === id)) {
      setPlaylist([...playlist, musicToAdd]);
    } else {
      setPlaylist(playlist.filter((item) => item.id !== id));
    }
  };

  const onSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="app">
      <Navbar
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
        onResetSearch={handleResetSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        <NumResult music={music} />
      </Navbar>
      <div className="main-content">
        <MusicListBox
          music={music}
          addToPlaylist={addToPlaylist}
          selectedGenre={selectedGenre}
          searchQuery={searchQuery}
        />
        <PlaylistBox playlist={playlist} />
      </div>
    </div>
  );
}

export default App;
