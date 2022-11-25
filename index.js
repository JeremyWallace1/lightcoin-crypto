class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    // Calculate the balance using the transaction objects.
    for (let i = 0; i < this.transactions.length; i++) {
      balance += this.transactions[i].value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    } else {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    } else return false;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('=================================');
console.log('Starting Account Balance: ', myAccount.balance);
console.log('=================================');
console.log('Attempt to withdraw $50.25...');
const t1 = new Withdrawal(50.25, myAccount);
console.log('Withdrawl result:', t1.commit());
console.log('Balance:', myAccount.balance);
console.log('---------------------------------');

console.log('Attempt to withdraw $9.99...');
const t2 = new Withdrawal(9.99, myAccount);
console.log('Withdrawl result:', t2.commit());
console.log('Balance:', myAccount.balance);
console.log('---------------------------------');

console.log('Attempt to deposit $120.00...');
const t3 = new Deposit(120.00, myAccount);
console.log('Deposit result:', t3.commit());
console.log('Balance:', myAccount.balance);
console.log('---------------------------------');

console.log('Attempt to withdraw $9.99...');
const t4 = new Withdrawal(9.99, myAccount);
console.log('Withdrawl result:', t4.commit());
console.log('Balance:', myAccount.balance);
