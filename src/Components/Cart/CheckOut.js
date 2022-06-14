
import { useRef, useState } from 'react';

import styles from './CheckOut.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pinCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPinCode = pinCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinCodeIsValid = isFiveChars(enteredPinCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      PinCode: enteredPinCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPinCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pincode: enteredPinCode,
    });
  };

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? '' : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    formInputsValidity.street ? '' : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    formInputsValidity.pincode ? '' : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    formInputsValidity.city ? '' : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
     
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
     
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
     
      <div className={postalCodeControlClasses}>
        <label htmlFor='pincode'>Postal Code</label>
        <input type='text' id='pincode' ref={pinCodeInputRef} />
        {!formInputsValidity.pincode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
     
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;





// import React, { useRef, useState } from 'react'
// import styles from './CheckOut.module.css';

// const isEmpty = value => value.trim() === '';
// const isSixchars = value => value.trim().length !== 6;


// export const CheckOut = (props) => {
//     const [formInputValidity, setFormInputValidity ] = useState({
//         name: true,
//         address: true,
//         city: true,
//         pincode: true
//     })

//     const nameInputref = useRef();
//     const addressref = useRef();
//     const cityref = useRef();
//     const pincoderef = useRef();

//     const confirmHandler = (event) => {
//         event.preventDefault();

//         const enteredName = nameInputref.current.value;
//         const enteredAddress = addressref.current.value;
//         const enteredCity = cityref.current.value;
//         const enteredPincode = pincoderef.current.value;
        
//     console.log(enteredName, enteredAddress,enteredCity,enteredPincode);

//         const enteredNameIsValid = !isEmpty(enteredName);
//         const enteredAddressIsValid = !isEmpty(enteredAddress);
//         const enteredCityIsValid = !isEmpty(enteredCity);
//         const enteredPincodeIsValid = !isSixchars(enteredPincode);

//         setFormInputValidity({
//             name: enteredNameIsValid,
//             address: enteredAddressIsValid,
//             city: enteredCityIsValid,
//             pincode: enteredCityIsValid
//         })
//         const formValidity = 
//                 enteredNameIsValid && 
//                 enteredAddressIsValid && 
//                 enteredCityIsValid && 
//                 enteredPincodeIsValid;

//                 if(formValidity){
//                     return;
//                 }

//                 props.onConfirm({
//                     name: enteredName,
//                     address: enteredAddress,
//                     city: enteredCity,
//                     pincode: enteredCity
//                 });
//                 console.log(props.onConfirm)
//     };
  

//   const nameControlClasses = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`;
//   const addressControlClasses = `${styles.control} ${formInputValidity.address ? '' : styles.invalid}`;
//   const cityControlClasses = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`;
//   const pincodeControlClasses = `${styles.control} ${formInputValidity.pincode ? '' : styles.invalid}`;
    
  
//   return (
//     <form onSubmit={confirmHandler} className={styles.form}>
//         <div className={nameControlClasses}>
//             <label htmlFor='name'>Your Name</label>
//             <input type='text' id='name' ref={nameInputref} />
//             {!formInputValidity.name && <p>Please Enter Name</p>}
//         </div>

//         <div className={addressControlClasses}>
//             <label htmlFor='address'> Address</label>
//             <input type='text' id='address' ref={addressref}/> 
//             {!formInputValidity.address && <p>Please Enter Address.</p>}
//         </div>

//         <div className={cityControlClasses}>
//             <label htmlFor='city'> city</label>
//             <input type='text' id='city' ref={cityref}/>
//             {!formInputValidity.city && <p>Please Enter City.</p>}
//         </div>

//         <div className={pincodeControlClasses}>
//             <label htmlFor='pincode'>Pincode</label>
//             <input type='text' id='pincode' ref={pincoderef}/>
//             {!formInputValidity.pincode && <p>Please Enter Pincode</p>}
//         </div>

//         <div className={styles.actions}>
//         <button type='button' onClick={props.onCancel}>Cancel</button>
//         <button type="submit" className={styles.submit}>Submit</button>
//         </div>
        
//     </form>
//   )
// }


// export default CheckOut;