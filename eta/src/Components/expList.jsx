import React, { useState } from 'react';

export default function ExpenseTracker() {
  const initialSafeToSpend = 2000;
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [safeToSpend, setSafeToSpend] = useState(initialSafeToSpend);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);

    if (parsedAmount > 0 && parsedAmount <= safeToSpend && name) {
      const newExpenses = [...expenses, { name, amount: parsedAmount }];
      setExpenses(newExpenses);
      setSafeToSpend(safeToSpend - parsedAmount);
      setAmount('');
      setName('');
    } else if (parsedAmount > safeToSpend) {
      alert('You do not have enough safe-to-spend balance to add this expense.');
    }
  };

  const handleEditExpense = (index) => {
    setName(expenses[index].name);
    setAmount(expenses[index].amount);
    setEditIndex(index);
  };

  const handleUpdateExpense = () => {
    const parsedAmount = parseFloat(amount);
    const originalAmount = expenses[editIndex].amount;
    const difference = originalAmount - parsedAmount;

    if (parsedAmount > 0 && name) {
      if (difference > 0 || safeToSpend >= parsedAmount - originalAmount) {
        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? { name, amount: parsedAmount } : expense
        );
        setExpenses(updatedExpenses);
        setSafeToSpend(safeToSpend + difference);
        setAmount('');
        setName('');
        setEditIndex(null);
      } else {
        alert('Updating this expense will exceed your safe-to-spend balance.');
      }
    }
  };

  const handleDeleteExpense = (index) => {
    const amountToRestore = expenses[index].amount;
    const filteredExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(filteredExpenses);
    setSafeToSpend(safeToSpend + amountToRestore);
  };

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-10 py-5">
      <h2 className="text-3xl font-bold mb-6">Welcome Back Wajahat</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-4">
          <p className="text-2xl font-bold text-[#0e141b]">${(initialSafeToSpend - safeToSpend).toFixed(2)}</p>
          <p className="text-sm text-[#4e7397]">Total Expenses</p>
        </div>
        <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-4">
          <p className="text-2xl font-bold text-[#0e141b]">${safeToSpend.toFixed(2)}</p>
          <p className="text-sm text-[#4e7397]">Safe-to-Spend</p>
        </div>
        <div className="flex flex-col items-start bg-white shadow-md rounded-lg p-4">
          <p className="text-2xl font-bold text-[#0e141b]">$500.00</p>
          <p className="text-sm text-[#4e7397]">Set Aside</p>
        </div>
      </div>

      {safeToSpend <= 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">You have reached your safe-to-spend limit!</span>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
        <div className="flex flex-col sm:flex-row items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter expense name"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
          <button
            onClick={editIndex !== null ? handleUpdateExpense : handleAddExpense}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            disabled={safeToSpend <= 0}
          >
            {editIndex !== null ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4">Expenses</h3>
        <ul className="space-y-3">
          {currentExpenses.map((expense, index) => (
            <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
              <span className="text-lg font-medium">{expense.name}: ${expense.amount.toFixed(2)}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditExpense(indexOfFirstExpense + index)}
                  className="bg-yellow-400 text-white rounded-lg px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(indexOfFirstExpense + index)}
                  className="bg-red-500 text-white rounded-lg px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <ul className="flex space-x-1">
            {[...Array(Math.ceil(expenses.length / expensesPerPage)).keys()].map((number) => (
              <li key={number} onClick={() => paginate(number + 1)}>
                <button
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">Total Expenses: ${(initialSafeToSpend - safeToSpend).toFixed(2)}</h3>
      </div>
    </div>
  );
};


