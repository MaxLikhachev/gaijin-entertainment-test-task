// import logo from './logo.svg';
import './App.css';
import DataGridContainer from './components/DataGridContainer'
import {
  columns,
  rows,
} from './data/DataGridTestData'

function App() {
  return (
    <div className="App">{/* 
      <header className="App-header">
      </header> */}
      <DataGridContainer columns={columns} rows={rows}/>
    </div>
  );
}

export default App;
