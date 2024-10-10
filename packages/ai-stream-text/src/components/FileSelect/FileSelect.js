import i18n from '@sitevision/api/common/i18n';
import PropTypes from 'prop-types';
import * as React from 'react';

const FileSelect = ({ options, files, setFiles }) => {
  const selectRef = React.useRef();

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    envision.select(selectRef.current, {
      clearButton: true,
      options: options.map((option) => ({
        value: option.id,
        text: option.name,
      })),
      items: files,
      onChange: (newValue) => {
        setFiles(newValue);
      },
      placeholder: i18n.get('selectProtocolToAskAbout'),
    });
  }, [options, files, setFiles]);

  return (
    <div className="env-form-field">
      <select ref={selectRef} className="env-form-input" />
    </div>
  );
};

FileSelect.propTypes = {
  options: PropTypes.array,
  files: PropTypes.string,
  setFiles: PropTypes.func,
};

export default FileSelect;
