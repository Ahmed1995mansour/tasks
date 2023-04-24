import './App.css';
import FilterBar from './components/filter-bar/FilterBar.component';
import ProgressBar from './components/progress-bar/ProgressBar.component';

function App() {
  return (
    <div className="App">
      <h2 className="title">Tasks: Road to Full Stack MERN </h2>
      <ProgressBar completed={50} />
      <FilterBar />
    </div>
  );
}

export default App;
