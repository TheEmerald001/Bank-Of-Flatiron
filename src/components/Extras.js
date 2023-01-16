//this component aim to provide helper functions for checking data validity
function validateForm(formData){
    const formDetails = {
      containsEmptyInput:false,
      isInvalid:false
    }

    //form should not contain empty field
    for(const inputData in formData){
      if(!formData[inputData]){
        formDetails.containsEmptyInput = true
        break
      }
    }

    //general state of validity of the form
    formDetails.isInvalid = formDetails.containsEmptyInput || formDetails.hasInvalidDate || false

    return formDetails;
  }

export { validateForm };
