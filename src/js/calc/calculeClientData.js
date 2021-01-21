export const calculeClientData = ( totalDeposit, totalProfit, clientDeposit, trader ) => {
	const ONE_PERSENT_FROM_TOTAL_DEPOSIT = +totalDeposit / 100;
	const ONE_PERSENT_FROM_TOTAL_PROFIT = +totalProfit / 100;
	const fields = {};

	fields.percentageOfTheTotalDeposit = clientDeposit / ONE_PERSENT_FROM_TOTAL_DEPOSIT;
	fields.firstProfit = ONE_PERSENT_FROM_TOTAL_PROFIT * fields.percentageOfTheTotalDeposit;
	fields.secondProfit = trader ? ( ( totalProfit / 2 ) + fields.firstProfit / 2 ) : fields.firstProfit / 2;

	totalProfit < 0 ? fields.secondProfit = trader ? fields.firstProfit : fields.secondProfit * 2 : 0;

	fields.depositAndProfit$ = +clientDeposit + +fields.secondProfit;
	fields.depositAndProfitPersent = 100 / ( ( +totalProfit + +totalDeposit ) / fields.depositAndProfit$ );

	return {...fields};
}