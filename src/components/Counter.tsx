import { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1 }: { initialValue?: number; step?: number }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>Counter Component</h2>
        <div className='text-6xl font-bold text-primary mb-4'>{count}</div>
        <div className='card-actions'>
          <button className='btn btn-error' onClick={decrement} disabled={count <= 0}>
            -
          </button>
          <button className='btn btn-neutral' onClick={reset}>
            Reset
          </button>
          <button className='btn btn-success' onClick={increment}>
            +
          </button>
        </div>
        {count === 0 && (
          <div className='alert alert-info mt-4'>
            <span>Counter is at zero!</span>
          </div>
        )}
        {count >= 10 && (
          <div className='alert alert-success mt-4'>
            <span>Great! You've reached {count}!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
