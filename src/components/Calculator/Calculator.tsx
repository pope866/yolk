import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + op + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  return (
    <div className="bg-gray-750 rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <CalculatorIcon className="w-5 h-5 mr-2 text-blue-500" />
        <h2 className="font-medium">Trading Calculator</h2>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <div className="text-gray-400 text-sm mb-1">{equation}</div>
          <div className="text-2xl font-bold font-mono">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {/* First Row */}
          <button onClick={handleClear} className="col-span-2 bg-red-500 bg-opacity-10 text-red-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors">
            Clear
          </button>
          <button onClick={() => handleNumber('.')} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
            .
          </button>
          <button onClick={() => handleOperator('/')} className="bg-blue-500 bg-opacity-10 text-blue-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors flex items-center justify-center">
            <Divide size={18} />
          </button>
          
          {/* Number Rows */}
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {num}
            </button>
          ))}
          
          {/* Operators */}
          <button onClick={() => handleOperator('*')} className="bg-blue-500 bg-opacity-10 text-blue-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors flex items-center justify-center">
            <X size={18} />
          </button>
          <button onClick={() => handleOperator('-')} className="bg-blue-500 bg-opacity-10 text-blue-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors flex items-center justify-center">
            <Minus size={18} />
          </button>
          <button onClick={() => handleOperator('+')} className="bg-blue-500 bg-opacity-10 text-blue-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors flex items-center justify-center">
            <Plus size={18} />
          </button>
          
          {/* Last Row */}
          <button onClick={() => handleNumber('0')} className="col-span-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
            0
          </button>
          <button onClick={handleEqual} className="col-span-2 bg-green-500 bg-opacity-10 text-green-500 p-3 rounded-lg hover:bg-opacity-20 transition-colors flex items-center justify-center">
            <Equal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;