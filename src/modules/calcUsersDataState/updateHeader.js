import { percentageIsXofY } from "../calc_fields/calcule";

const unpdateHeader = ( header ) => {

	let {
		totalDeposit,
		newDeposit,
	} = header;

	let profit = newDeposit - totalDeposit;

	let newHeader = {
		...header,
		newDepositInPercents: percentageIsXofY( newDeposit, totalDeposit ),
		profit
	}

	newHeader.profitInPercentes = percentageIsXofY( profit, totalDeposit);
	newHeader.finalProfit = profit;
	newHeader.finalProfitInPercents = newHeader.profitInPercentes;
	newHeader.newCapital = profit + totalDeposit;

	newHeader.newDeposit = ( typeof newDeposit === 'number' && newDeposit !== 0 ) ? newDeposit.toFixed( 4 ) : newDeposit;

	return newHeader;
};

export default unpdateHeader;