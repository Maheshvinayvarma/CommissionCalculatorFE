class CommissionCalculator {
  constructor() {
    // Initialize with default values
    this.resetDefaults();

    // Initialize historical data
    this.salesHistory = [];
  }

  calculateCommission(lockQty, stockQty, barrelQty) {
    // Calculate total sales
    const totalSales =
      lockQty * this.lockCost +
      stockQty * this.stockCost +
      barrelQty * this.barrelCost;

    // Calculate commission rate based on customizable rates
    const commissionRate = this.getCommissionRate(totalSales);

    // Calculate commission
    let commission = totalSales * commissionRate;

    // Track sales history
    this.salesHistory.push({ totalSales, commission, lockQty, stockQty, barrelQty });

    const previousHistory = [...this.getSalesHistory(), ...this.salesHistory];

    window.localStorage.setItem('salesHistory', JSON.stringify(previousHistory));

    return { totalSales, commission };
  }

  getCommissionRate(totalSales) {
    // Implement logic for customizable commission rates based on total sales
    if (totalSales <= 1000) {
      return this.lowCommissionRate;
    } else if (totalSales <= 1800) {
      return this.mediumCommissionRate;
    } else {
      return this.highCommissionRate;
    }
  }

  setProductCosts(lockCost, stockCost, barrelCost) {
    this.lockCost = lockCost;
    this.stockCost = stockCost;
    this.barrelCost = barrelCost;
  }

  setCommissionRates(lowRate, mediumRate, highRate) {
    this.lowCommissionRate = lowRate;
    this.mediumCommissionRate = mediumRate;
    this.highCommissionRate = highRate;
  }

  resetDefaults() {
    // Default product costs
    this.lockCost = 45;
    this.stockCost = 30;
    this.barrelCost = 25;

    // Default commission rates
    this.lowCommissionRate = 0.1;
    this.mediumCommissionRate = 0.15;
    this.highCommissionRate = 0.2;
  }

  integrateWithCRM(salesData) {
    // Integrate with CRM system to fetch sales data
    // Example: salesData = CRM.fetchSalesData();
    const { lockQty, stockQty, barrelQty } = salesData;
    return this.calculateCommission(lockQty, stockQty, barrelQty);
  }

  forecastCommission(lockQty, stockQty, barrelQty, futureSalesData) {
    // Forecast commission for future sales
    // Example: futureSalesData = { lockQty: 20, stockQty: 30, barrelQty: 40 };
    return this.calculateCommission(
      lockQty + futureSalesData.lockQty,
      stockQty + futureSalesData.stockQty,
      barrelQty + futureSalesData.barrelQty
    );
  }

  getSalesHistory() {
    const history = JSON.parse(window.localStorage.getItem('salesHistory')) || [];
    return history;
  }
}

// Usage Example:
// const commissionCalculator = new CommissionCalculator();
// commissionCalculator.setProductCosts(45, 30, 25);
// commissionCalculator.setCommissionRates(0.1, 0.15, 0.2);

// // Calculate commission for current sales
// const currentCommission = commissionCalculator.calculateCommission(50, 60, 70);
// console.log("Commission for current sales:", currentCommission);

// // Integrate with CRM system
// const salesDataFromCRM = { lockQty: 100, stockQty: 120, barrelQty: 80 };
// const integratedCommission = commissionCalculator.integrateWithCRM(salesDataFromCRM);
// console.log("Commission integrated with CRM:", integratedCommission);

// // Forecast commission for future sales
// const futureSalesData = { lockQty: 20, stockQty: 30, barrelQty: 40 };
// const forecastedCommission = commissionCalculator.forecastCommission(50, 60, 70, futureSalesData);
// console.log("Forecasted commission for future sales:", forecastedCommission);

// // Get sales history
// const salesHistory = commissionCalculator.getSalesHistory();
// console.log("Sales History:", salesHistory);
