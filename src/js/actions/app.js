export const NAVIGATE = 'NAVIGATE';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const navigate = (path) => {
  return {
    type: NAVIGATE,
    path
  };
};

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};
