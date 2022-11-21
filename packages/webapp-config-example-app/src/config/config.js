;(() => {
   window.validate = () => {
      const emailInputs = document.querySelectorAll('input[type=email]')

      let valid = true

      emailInputs.forEach((emailInput) => {
         if (!emailInput.validity.valid) {
            valid = false
            window.sv.addErrorMessage(emailInput, {
               message: emailInput.validationMessage,
               isValid: function (e) {
                  return e.target.validity.valid
               }
            })
         }
      })

      return valid && window.sv.validate()
   }
})()
