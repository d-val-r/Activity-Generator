import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// default URL for the API
const BORED_API = "http://www.boredapi.com/api/activity/";


// the API supports activities for groups of the following sizes
const participants = [1,2,3,4,5,8];

function App() {

  // states for the activity and its fade animation
  const [activity, setActivity] = useState(null);
  const [fade, setFade] = useState(1);

  function getActivity() {

    // select a random group size
    let groupSize = participants[Math.floor(Math.random() * participants.length) % participants.length];

    // perform the API call
    fetch(`${BORED_API}?participants=${groupSize}`)
    .then(resp => resp.json())
    .then(setActivity);

    // when the button is clicked, set the fade property to 1
    setFade(1);
  }

  return (
    <div className="App">
      <h1 className="activity" onAnimationEnd={() => setFade(0)} fade={fade}>{activity === null ? "Click the button to generate an activity!" : activity["activity"]}</h1>
      <button onClick={getActivity}>Fetch activity</button>
    </div>
  );
}

export default App;
