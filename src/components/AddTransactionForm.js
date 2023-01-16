import React, { useState } from "react";
import { validateForm } from "./Extras";

function AddTransactionForm({newData}) {

  const [formData, setFormData] = useState({
    date:"",
    description:"",
    category:"",
    amount:""
  })
  function handleSubmit(e){
    e.preventDefault();
    //check for validity of form data
    const formInput = validateForm(formData)

    if(formInput.containsEmptyInput){
      alert("Please fill in all inputs")
    }else if(!formInput.isInvalid){
      // persist transaction on server after validations
      fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      })
      .then(r => r.json())
      .then(data => newData(data))
      alert('Transaction Added successfully')
    }
    setFormData("")
    }
  
  function handleChange(e){
    e.preventDefault();
    const key = e.target.name
    const value = e.target.value;
    setFormData({...formData, [key]: value})
  }
  return (    
    <div className="ui segment">
      <form onSubmit={ handleSubmit } className="ui form">
        <div className="inline fields">
          <input type="date" name="date" onChange={ handleChange} />
          <input type="text" name="description" placeholder="Description" onChange={handleChange} />
          <input type="text" name="category" placeholder="Category"  onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" onChange={handleChange}/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
