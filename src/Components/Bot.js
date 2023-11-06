import React, { useState, useEffect } from 'react';

function KeyboardBot() {
  const [inputValue, setInputValue] = useState('');
  const [simulatedKey, setSimulatedKey] = useState('');

  // Función para manejar el evento de teclado
  function handleKeyPress(event) {
    const pressedKey = event.key;
    setInputValue((prevInput) => prevInput + pressedKey);

    if (pressedKey === 'Enter') {
      if (inputValue !== 'arriba') {
        setInputValue('');
        setSimulatedKey('');
      }
    }
  }

  // Función para simular la pulsación de una tecla predefinida
  function simulateKeyPress(key) {
    setSimulatedKey(key);
    const keyEvent = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(keyEvent);
    setInputValue('');
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue]);

  useEffect(() => {
    if (inputValue === 'arriba') {
      simulateKeyPress('ArrowUp');
    }
  }, [inputValue]);

  return (
    <div>
      <p>Escribe una palabra concreta como "arriba" y pulsa "Enter" para simular la pulsación de la tecla de dirección arriba.</p>
      <p>Palabra escrita: {inputValue}</p>
      <p>Tecla simulada: {simulatedKey}</p>
    </div>
  );
}

export default KeyboardBot;

