import useInput from "../hooks/use-input";


const BasicForm = (props) => {
  const textValidation = value => value.trim() !== '';
  const emailValidation = value => textValidation(value) && value.includes('@');

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    error: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: resetFirstNameInput
  } = useInput(textValidation);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    error: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: resetLastNameInput
  } = useInput(textValidation);

  const {
    value: emailValue,
    isValid: emailIsValid,
    error: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput(emailValidation);

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!firstNameIsValid || !lastNameIsValid || !emailIsValid) {
      return;
    }

    console.log(firstNameValue, " ", lastNameValue, " ", emailValue);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  }

  const firstNameClasses = firstNameIsInvalid ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameIsInvalid ? 'form-control invalid' : 'form-control';
  const emailClasses = emailIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='first_name'>First Name</label>
          <input type='text' id='first_name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={firstNameValue} />
          {firstNameIsInvalid && <p className="error-text">First Name must not be empty.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='last_name'>Last Name</label>
          <input type='text' id='last_name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={lastNameValue} />
          {lastNameIsInvalid && <p className="error-text">Last Name must not be empty.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='text' id='email'
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          value={emailValue} />
        {emailIsInvalid && <p className="error-text">
          Email must be valid (no-empty and '@' included).</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
