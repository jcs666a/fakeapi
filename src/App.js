import { useState, useEffect } from 'react';
import { getStates } from './fakeAPI';
import './App.css';

function App() {
  const [state, filterStates] = useState({
    isLoading: true,
    inputText: '',
    stateList: []
  });

  const {
    isLoading,
    stateList
  } = state;

  const getFunc = async () => {
    const response = await getStates();
    const filteredResponse = response.filter(res => {
      return res.name.toUpperCase().includes(state.inputText.toUpperCase())
    });
    filterStates((prevState) => ({
      ...prevState,
      isLoading: false,
      stateList: filteredResponse
    }));
  };

  const setLoading = () =>
    filterStates((prevState) => ({...prevState, isLoading: true, stateList: []}));

  useEffect(() => {
    getFunc();
  }, [state.stateList]);

  return (
    <div className="App">

      {isLoading && <h3>Loading...</h3>}

      <div className="field-container">
        <input value={state.inputText}
          onKeyPress={({target, key}) => {
            if(key === 'Enter'){
              setLoading();
              const inputText = target.value;
              filterStates((prevState) => ({...prevState, inputText}));
            }
          }}
          onChange={({target}) => {
            const inputText = target.value;
            filterStates((prevState) => ({...prevState, inputText}));
          }} />
        <button onClick={()=> {
          setLoading();
          getFunc();
        }} disabled={isLoading}>
          Filter
        </button>
      </div>

      {!isLoading && <ul>
        {stateList.map(state => (
        <li key={state.id}>
          {state.name}
        </li>))}
      </ul>}
    </div>
  );
}

export default App;
