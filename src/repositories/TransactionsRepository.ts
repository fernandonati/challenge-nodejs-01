import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransaction {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];  

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // retorna todas as transacoes.
    return this.transactions;
  }

  public getBalance(): Balance {
    // recupera o total.
    const income = this.transactions.reduce((totalin,row) =>       
       row.type === "income"? totalin + row.value : totalin  
    ,0);
   

    let outcome = this.transactions.reduce((totalout,row) =>       
      row.type === "outcome"? totalout + row.value : totalout  
    ,0);

    const total = (income - outcome);    
    const balance = {income,outcome,total};  //pegar com redux.
    return balance;
  }

public getTotalIncome() : number {
    // recupera o total.
    const income = this.transactions.reduce((totalin,row) =>       
       row.type === "income"? totalin + row.value : totalin  
    ,0);
  return income;
}


  public create({title,value,type}: createTransaction): Transaction {    
    const transaction = new Transaction({title,value,type});
    this.transactions.push(transaction);    
    return transaction;
  }
}

export default TransactionsRepository;
