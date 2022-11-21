(function () {
  const { validate, addErrorMessage } = window.sv;

  window.validate = function () {
    const urlInput = document.querySelector('[name="url"]');

    let valid = true;
    if (!urlInput.validity.valid) {
      valid = false;
      addErrorMessage(urlInput, {
        isValid: function () {
          return urlInput.validity.valid;
        },
      });
    }

    return valid && validate();
  };
})();
