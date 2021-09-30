<<<<<<< Updated upstream
import React from 'react';
import './App.css';
import cards from './data';
import Card from './components/Card';

function App() {
  return (
    <div className="wrapper">
      {cards.map((card) => (
        <Card
          title={card.title}
          date={card.date}
          image={card.image}
          overview={card.overview}
          overviewdescription={card.overviewdescription}
          requirements={card.requirements}
          requirementsdescription={card.requirementsdescription}
          othersrequirements={card.othersrequirements}
          othersrequirementsdescription={card.othersrequirementsdescription}
          comments={card.comments}
          commentsdescription={card.commentsdescription}
        />
      ))}
    </div>
  );
=======
function App() {

>>>>>>> Stashed changes
}

export default App;
