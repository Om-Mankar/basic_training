import readline from 'node:readline';

const Calculator = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // operation to perform
  rl.question('Enter the Numbers \n', (strVal) => {
    // eslint-disable-next-line no-eval
    console.log('Your output is: ', eval(strVal));
    rl.close();
  });
};
export default Calculator;
