import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    error: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    error: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput((value) => value.trim().includes('@'));


  let formIsValid = enteredNameIsValid && enteredEmailIsValid; // true or false

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName, " ", enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input type='text' id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">
          Email must be valid (no-empty and @ included).</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
