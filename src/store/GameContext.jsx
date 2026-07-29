import  { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [editingId, setEditingId] = useState(null);

  const startEditing = (id) => setEditingId(id);
  const cancelEditing = () => setEditingId(null);

  return (
    <GameContext.Provider value={{ editingId, startEditing, cancelEditing }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}