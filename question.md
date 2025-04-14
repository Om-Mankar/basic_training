1. Write a regex pattern that matches the password
- Uppercase (A-Z) and lowercase (a-z) English letters.
- Digits (0-9).
- Characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~
- Character. ( period, dot or full stop) provided that it is not the first or last character and it will not come one after the other.
2. Write a regex pattern to match the valid email address
3. Write a regex pattern that verifies credit card pattern
4. Write a regex function to distinguish and pick the values of email address, phone number from the below paragraph

    ```
    Lorem ipsum dolor 9221122108 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. mytraining@deqode.com Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. +91-20200-21210 Sagittis orci a scelerisque purus semper eget duis. Nulla pharetra diam sit amet nisl suscipit. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Fusce (+91)-20200-21210 ut placerat mt@test.inc orci nulla. Pharetra vel turpis nunc eget lorem dolor. Tristique senectus et netus et malesuada.
    ```

5. Implement the setTimeout function using native javascript only. 
6. Implement a javascript Array having the following prototype functions without using Native javascript array:
- push
- pop
- shift
- unshift
- length
- splice
- indexOf
- forEach
7. Provided a function that checks the validity of string and returns results via a callback.
    ``` function validateString(input, callback) {
     setTimeout(function () {
      // input is said to be valid if it is a lowercase string
      if (typeof input === "string" && input === input.toLowerCase()) {
       return callback(null, true)
     }

     return callback(new Error('Invalid string'), null)
     }, 500)
    }
    ```
Check if values in array (see below example) are valid or not.
Example
Input: ['first', 'Second', 'thiRd', 4, false, 'true']
Output: {"4":false,"first":true,"Second":false,"thiRd":false,"false":false,"true":true}
NOTE: you can not use loops or recursion. Also, you should not change the ‘validateString’ function (i.e. use it as it is).