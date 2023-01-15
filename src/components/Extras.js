function validateForm(formData){
    const formDetails = {
      containsEmptyInput:false,
      hasInvalidDate:true,
      isInvalid:false
    }

    //form should not contain empty field
    for(const inputData in formData){
      if(!formData[inputData]){
        formDetails.containsEmptyInput = true
        break
      }
    }

    //date should be between 2000 and today
    const allowablePastDate = (new Date("2019")).getTime()
    const today = (new Date()).getTime()
    const formDataDate = (new Date(formData.date)).getTime()
    formDetails.hasInvalidDate = formDataDate < allowablePastDate ? true : formDataDate > today ? true : false

    //general state of validity of the form
    formDetails.isInvalid = formDetails.containsEmptyInput || formDetails.hasInvalidDate || false

    return formDetails;
  }

export { validateForm}