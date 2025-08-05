import React from 'react';

interface AppProps {
  title: string;
  unusedVariable: string;
}

const App: React.FC<AppProps> = ({ title, unusedVariable }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default App;
