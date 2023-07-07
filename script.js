// Budget Tracker Logic

let transactions = [];

function addTransaction() {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description.trim() === "" || isNaN(amount)) {
    return;
  }

  const transaction = {
    description,
    amount,
    type
  };

  transactions.push(transaction);

  updateBudget();
  updateTransactions();

  descriptionInput.value = "";
  amountInput.value = "";
  saveToLocalStorage();

}

function updateBudget() {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (let transaction of transactions) {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  }

  const availableBudget = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = `Total Income: ₹ ${totalIncome.toFixed(2)}`;
  document.getElementById("total-expenses").textContent = `Total Expenses: ₹ ${totalExpenses.toFixed(2)}`;
  document.getElementById("available-budget").textContent = `Available Budget: ₹ ${availableBudget.toFixed(2)}`;
  saveToLocalStorage();

}

function updateTransactions() {
  const transactionsList = document.getElementById("transactions");
  transactionsList.innerHTML = "";

  for (let transaction of transactions) {
    const listItem = document.createElement("li");
    listItem.textContent = `${transaction.description}: ₹ ${transaction.amount.toFixed(2)}`;
    listItem.className = transaction.type;

    transactionsList.appendChild(listItem);
  }
  saveToLocalStorage();

}

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  function retrieveFromLocalStorage() {
    const transactionsData = localStorage.getItem('transactions');
  
    if (transactionsData) {
      transactions = JSON.parse(transactionsData);
      updateBudget();
      updateTransactions();
    }
  }
  
  // Retrieve transactions from local storage on page load
  document.addEventListener('DOMContentLoaded', () => {
    retrieveFromLocalStorage();
  });

document.getElementById("add-btn").addEventListener("click", addTransaction);
