/* global _i18n, window, document, jQuery */

(($) => {
  window.setValues = (values) => {
    const $baseContainer = $(document.getElementById("base-container"));
    setupExistingConfig($baseContainer, values);
    initInteraction($baseContainer, $("#add-button"));
  };
})(jQuery);

function initInteraction($baseContainer, $addButton) {
  $addButton.on("click", () => {
    const index = document.querySelectorAll(".link-group").length;
    appendLink($baseContainer, { index });
  });
}

function appendLink($container, data) {
  $container.append(template(data));
  $container.trigger("setup-component", `[name="image-${data.index}"]`);
  $container.trigger("setup-component", `[name="link-${data.index}"]`);
}

function setupExistingConfig($baseContainer, values) {
  let index = 0;
  while (index >= 0) {
    const text = values[`text-${index}`];
    const image = values[`image-${index}`];
    const link = values[`link-${index}`];

    if (!text || !image || !link) {
      break;
    }

    appendLink($baseContainer, {
      text,
      image,
      link,
      index,
    });

    index++;
  }

  window._setValues(values);
}

function template({ text = "", image = "", link = "", index }) {
  return `
    <div class="panel panel-default link-group">
      <div class="panel-heading">
        <h3 class="panel-title">${_i18n.link}</h3>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label>${_i18n.text}</label>
          <input
            value="${text}"
            class="form-control"
            name="text-${index}"
            placeholder="${_i18n.selectText}"
            required
            data-sv-validation-error-msg="${_i18n.errorMessage}"
          />
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6 form-group">
              <label>${_i18n.image}</label>
              <input
                value="${image}"
                class="form-control"
                data-component="image-selector"
                name="image-${index}"
                placeholder="${_i18n.selectImage}"
                required
                data-sv-validation-error-msg="${_i18n.errorMessage}"
              />
            </div>
            <div class="col-md-6 form-group">
              <label>${_i18n.link}</label>
              <input
                value="${link}"
                class="form-control"
                data-component="link-selector"
                name="link-${index}"
                placeholder="${_i18n.selectLink}"
                required
                data-sv-validation-error-msg="${_i18n.errorMessage}"
              />
          </div>
        </div>
      </div>
    </div>`;
}
