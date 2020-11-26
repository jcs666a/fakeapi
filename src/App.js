import { useState, useEffect } from 'react';
import { getStates } from './fakeAPI';
import './App.css';

function App() {
  const [state, updateState] = useState({
    isLoading: true,
    inputText: '',
    stateList: []
  });

  const {
    inputText,
    isLoading,
    stateList
  } = state;

  const getStatesList = async () => {
    const response = await getStates();
    const filteredResponse = response.filter(res => {
      return res.name.toUpperCase().includes(inputText.toUpperCase())
    });
    updateState((prevState) => ({
      ...prevState,
      isLoading: false,
      stateList: filteredResponse
    }));
  };

  const setLoading = () =>
    updateState((prevState) => ({...prevState, isLoading: true, stateList: []}));

  useEffect(() => {
    getStatesList();
  }, [state.stateList]);

  return (
    <div className="App">

      {isLoading && <h3>Loading...</h3>}

      <div className="field-container">
        <input value={inputText}
          onKeyPress={({key}) => {
            if(key === 'Enter'){
              setLoading();
            }
          }}
          onChange={({target}) => {
            const inputText = target.value;
            updateState((prevState) => ({...prevState, inputText}));
          }} />
        <button onClick={setLoading} disabled={isLoading}>
          Filter
        </button>
      </div>

      {!isLoading && <ul>
        {stateList.map(currState => (
        <li key={currState.id}>
          {currState.name}
        </li>))}
      </ul>}
    </div>
  );
}

export default App;
