/**
 * 📋 !Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe 
 *    ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar 
 * sab sahi hai toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  // let ({ name, email, phone, age, pincode, state, agreeTerms } = formData);
  let errors = {};

  //Validation
  // name,
  handleNameValidation(formData?.name, errors);
  //  email,
  handleEmailValidation(formData?.email, errors);
  //  phone,
  handlePhoneValidation(formData?.phone, errors);
  //  age,
  handleAgeValidation(formData?.age, errors);
  //  pincode,
  handlePincodeValidation(formData?.pincode, errors);
  //  state,
  handleStateValidation(formData?.state, errors);
  //  agreeTerms
  handleAgreeTermsValidation(formData?.agreeTerms, errors);

  //
  const isValid = ( Object.keys(errors).length === 0)? true : false;

  return {isValid, errors};
}

//handleValidation
// name,
function handleNameValidation(name, error){
  const errorMessage = "Name must be 2-50 characters";
  
  if(typeof name !== "string" 
    || name.trim().length < 2
    || name.trim().length > 50
  ){
    error.name = errorMessage;
    return
  }
  
}

//  email,
function handleEmailValidation(email, error){
  const errorMessage = "Invalid email format";
  if(
    typeof email !== 'string' || !email.includes('@') 
    || !email.includes( '.', !email.lastIndexOf("@") )
  ){
    //
    error.email = errorMessage;
    return;
  }else{
    if( email.indexOf("@") !== email.lastIndexOf("@") ){
      error.email = errorMessage;
    }
    return;
  }
}
//  phone,
function handlePhoneValidation(phone, error) {
    const errorMessage = "Invalid Indian phone number";
    const startsWith = ["6", "7", "8", '9', 9, 6, 7, 8];
    const myReg = /[^0-9]+/g;
    // const nonDigits = 

    if (
        typeof phone !== 'string' || phone.length !== 10
        || !startsWith.includes(phone[0])
        || [...phone.matchAll(myReg)].length !== 0
    ) {
        error.phone = errorMessage;
    }
    return;
}
//  age,
function handleAgeValidation(age, error) {
    const parseAge = (typeof age === 'string')? Number(age): age;
    const errorMessage = "Age must be an integer between 16 and 100";

    if (Number.isNaN(parseAge)
        || parseAge < 16 || parseAge > 100
        || !Number.isInteger( parseAge ) 
    ) {
        error.age = errorMessage;
    }
    return;
}
//  pincode,
function handlePincodeValidation(pincode, error) {
    const errorMessage = "Invalid Indian pincode";
    const myReg = /[^0-9]+/g;

    if (typeof pincode !== 'string'
        || pincode.length !== 6
        || pincode[0] === '0'
        // ! Error Resolved here through [...] spread
        || [...pincode.matchAll(myReg)].length !== 0
    ) {
        error.pincode = errorMessage;
    }
    return;
}
//  state,
function handleStateValidation(state, error){
  const errorMessage = "State is required";

  if(typeof state !== 'string' || state.trim() === ""){
    error.state = errorMessage;
    return
  }
}
//  agreeTerms
function handleAgreeTermsValidation(agreeTerms, error){
  const errorMessage = "Must agree to terms";

  if(agreeTerms){
    return;
  }else{
    error.agreeTerms = errorMessage;
  }
}