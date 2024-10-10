import i18n from '@sitevision/api/common/i18n';
import router from '@sitevision/api/common/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import FileSelect from '../FileSelect';
import styles from './App.scss';

const App = ({ options }) => {
  const questionRef = React.useRef();

  const [text, setText] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setText('');

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    const question = questionRef.current.value;

    try {
      const url = router.getStandaloneUrl('/chat');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, files }),
      });

      if (!response || !response.body) {
        throw new Error('No response from server');
      }

      const reader = response.body.getReader();
      let result = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);

        result += text;
        setText(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <FileSelect options={options} files={files} setFiles={setFiles} />
      <form
        className="env-form env-form-field"
        action="/"
        onSubmit={handleSubmit}
      >
        <div className="env-form-control">
          <label
            htmlFor="ai-document-chat"
            className="env-form-label"
            aria-hidden="true"
          >
            <svg className="env-icon env-icon--x-small">
              <use href="/sitevision/envision-icons.svg#icon-chat"></use>
            </svg>
          </label>
          <input
            type="text"
            ref={questionRef}
            className="env-form-input"
            placeholder={i18n.get('typeYourProtocolQuestion')}
            id="ai-document-chat"
            autoComplete="off"
          />
          <button
            disabled={isProcessing || !files.length}
            className="env-button env-button--primary"
          >
            {i18n.get('ask')}
          </button>
        </div>
      </form>
      {text && (
        <pre className={classNames(styles.text, 'env-text')}>{text}</pre>
      )}
    </>
  );
};

App.propTypes = {
  options: PropTypes.array,
  selectedFiles: PropTypes.array,
};

export default App;
