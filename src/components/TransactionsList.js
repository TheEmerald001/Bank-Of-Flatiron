import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, setTransactions, search}) {
  const [sortStrategy] = useState({
    date: -1,
    description: -1,
    category: -1,
    amount: -1
  })
  let transactionList;

  if(transactions){
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.description.toLowerCase().includes(search.toLowerCase()) || transaction.category.toLowerCase().includes(search.toLowerCase())
      )
    })
    transactionList = filteredTransactions.map((transaction) => (    
      <Transaction
        key={transaction.id}
        id = {transaction.id}
        date={transaction.date}
        description={transaction.description}
        category={transaction.category}
        amount={transaction.amount}
      />
    ))
  }
  function updateSortStrategy(item){
    sortStrategy[item] = sortStrategy[item] * -1;
  }

  function sortTransactionList(event){
    const sortBy  = event.target.textContent.toLowerCase()
    updateSortStrategy(sortBy)

    let transactionsCopy;
    
    if(sortBy === "category" || sortBy === "description"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()){
          return sortStrategy[sortBy]
        }else if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
          return sortStrategy[sortBy] * -1
        }else {
          return 0
        }
      })
    }else if(sortBy === "amount"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a.amount > b.amount){
          return sortStrategy.amount
        }else if(a.amount < b.amount){
          return sortStrategy.amount * -1
        }else {
          return 0
        }
      })  
    }else if(sortBy === "date"){
      transactionsCopy = [...transactions].sort((a, b) => {
        const timeA = (new Date(a.date)).getTime()
        const timeB = (new Date(b.date)).getTime()

        if(timeA> timeB){
          return sortStrategy.date
        }else if(timeA < timeB){
          return sortStrategy.date * -1
        }else {
          return 0
        }
      })       
    }

    setTransactions(transactionsCopy)
  }
  
  
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by date">Date</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by description">Description</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by category">Category</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" onClick={sortTransactionList} title="click to sort by amount">Amount</h3>
          </th>
          <th style={{backgroundColor: "rgba(0, 0, 0, 0.10)", cursor: "pointer"}}>
            <h3 className="ui center aligned header" title="click to sort by amount">Action</h3>
          </th>
        </tr>
        {transactionList}
      </tbody>
    </table>
  );
}

export default TransactionsList;
