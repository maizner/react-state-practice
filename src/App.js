import './App.css';
// import  { UseState } from './UseState';
import  { UseReducer} from './UseReducer';
import  { ClassState } from './ClassState';
function App() {
  return (
    <div className='App'>
     
      {/* < UseState name='UseState' /> */}
      < UseReducer name='UseReducer' />
      < ClassState name='ClassState' />
    </div>
  );
}

export default App;
