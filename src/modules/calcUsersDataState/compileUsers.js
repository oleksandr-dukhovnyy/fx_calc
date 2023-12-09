import {
  percentageIsXofY,
  findXpersentsFromY,
} from '../calc_fields/calculate.js';

export const compileUsers = (header, userList) => {
  let traderBonus_global = 0;

  const { totalDeposit, newDeposit } = header;

  const profit =
    header.profit === 0 ? newDeposit - totalDeposit : header.profit;

  return {
    arr: userList.map((user) => {
      const percentFromDeposit = percentageIsXofY(user.depo, totalDeposit);
      const balance = findXpersentsFromY(percentFromDeposit, newDeposit);
      const balanceInPercents = percentageIsXofY(balance, user.depo);
      const _profit = balance - user.depo;
      const profitInPercents =
        user.depo !== 0 ? percentageIsXofY(profit, totalDeposit) : 0;
      let traderBonus = 0;

      if (!user.isTrader) {
        traderBonus = _profit / 2;
        traderBonus_global += traderBonus;
      }
      let finalProfit = _profit / 2;
      if (user.isTrader === true) {
        finalProfit += finalProfit + traderBonus_global;
      }
      const finalProfitInPercents = profitInPercents / 2;
      const newCapital = user.depo + finalProfit;
      const newCapitalInPercents = percentageIsXofY(newCapital, newDeposit);

      const fix = (num) => {
        if (typeof num !== 'number') return '';

        const fixed = num.toFixed(4);
        return fixed === 'NaN' ? '' : fixed;
      };

      const returnedUser = {
        ...user,
        depo: fix(user.depo === 0 ? '' : user.depo),
        percentFromDeposit: fix(percentFromDeposit),
        balance: fix(balance),
        balanceInPercents: fix(balanceInPercents),
        profit: fix(_profit),
        profitInPercents: fix(profitInPercents),
        traderBonus: fix(traderBonus),
        finalProfit: fix(finalProfit),
        finalProfitInPercents: fix(finalProfitInPercents),
        newCapital: fix(newCapital),
        newCapitalInPercents: fix(newCapitalInPercents),
      };

      return returnedUser;
    }),
    traderBonus: traderBonus_global,
  };
};
