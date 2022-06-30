import React from 'react';

const StoreContext = React.createContext(null);

type PropsType = {
  store: never;
  children: never;
};

export const Provider = (props: PropsType) => {
  return <StoreContext.Provider value={props.store}>{props.children}</StoreContext.Provider>;
};

export default StoreContext;
