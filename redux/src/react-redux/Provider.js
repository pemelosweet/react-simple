import ReactReduxContext from './ReactReduxContext';
export default function ({store,children}) {
  console.log(store);
    return (
      <ReactReduxContext.Provider value={{store}}>
          {children}
      </ReactReduxContext.Provider>
    )
  
}