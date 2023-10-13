/* global window  document */
window.validate = () => {
  const imagesInput = document.querySelector("input[name=images]");

  let valid = true;

  if (imagesInput.value.split(",").length < 3) {
    valid = false;
    window.sv.addErrorMessage(imagesInput, {
      isValid: function () {
        return imagesInput.value.split(",").length >= 3;
      },
    });
  }

  return valid && window.sv.validate();
};
