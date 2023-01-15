import React, { useEffect, useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  //store fetched data from side effect
  const [transactions, setTransactions] = useState([]);

  //manage state for user serch parameters
  const [ search, setSearch] = useState(""); 
  
   //Featch all transaction from server
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((r) => r.json())
      .then((data) => setTransactions(data)) //Setter activity for transaction after server response
  }, [])

  //Re-renders page with updated state after creating a new transaction
  function updatedTransactions(newTransactions) {
   const updatedTransactionsArray = [...transactions, newTransactions]
   setTransactions(updatedTransactionsArray)
  }

  //render all components
  return (
    <div>
      <Search search={search} setSearch={setSearch}/>
      <AddTransactionForm newData={updatedTransactions} />
      <TransactionsList transactions={transactions} setTransactions={setTransactions} search={search} />
    </div>
  );
}


export default AccountContainer;
