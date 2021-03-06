import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}


class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  //Dependency inversion.
  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}: Request): Transaction {    
    
    const balance = this.transactionsRepository.getBalance();

    if (type === "outcome") {
      if (value > balance.total) {
        throw Error("O total é maior que o disponivel");
      }
    }
        
    const transaction = this.transactionsRepository.create({title,value,type});
    return transaction;
  }
}

export default CreateTransactionService;
