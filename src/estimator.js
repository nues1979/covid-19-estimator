const covid19ImpactEstimator = (data) => {
  let days = 0;

  const average = data.region.avgDailyIncomePopulation;
  const income = data.region.avgDailyIncomeInUSD;
  if (data.periodType === 'days') {
    days = parseInt(data.timeToElapse / 3, 10);
  } else if (data.periodType === 'months') {
    days = data.timeToElapse * 10;
  } else {
    days = parseInt((data.timeToElapse * 7) / 3, 10);
  }
  const rate = (2 ** days);
  return {
    data,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: data.reportedCases * 10 * rate,
      severeCasesByRequestedTime: parseInt(data.reportedCases * 10 * rate * 0.15, 10),
      hospitalBedsByRequestedTime: parseInt((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (10 * rate * 0.15), 10),
      casesForICUByRequestedTim: parseInt(data.reportedCases * (10 * rate * 0.05), 10),
      casesForVentilatorsByRequestedTime: parseInt(data.reportedCases * (10 * rate * 0.02), 10),
      dollarsInFlight: parseInt((data.reportedCases * 10 * rate * average
      * income) / data.timeToElapse, 10)
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: data.reportedCases * 50 * rate,
      severeCasesByRequestedTime: parseInt(data.reportedCases * (50 * rate * 0.15), 10),
      hospitalBedsByRequestedTime: parseInt((data.totalHospitalBeds * 0.35)
     - data.reportedCases * (50 * rate * 0.15), 10),
      casesForICUByRequestedTim: parseInt(data.reportedCases * (50 * rate * 0.05), 10),
      casesForVentilatorsByRequestedTime: parseInt(data.reportedCases * 50 * rate * 0.02, 10),
      dollarsInFlight: parseInt((data.reportedCases * 50 * rate * average
      * income) / data.timeToElapse, 10)

    }
  };
};
export default covid19ImpactEstimator;
