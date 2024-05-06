// Initialize Commission Calculator
const commissionCalculator = new CommissionCalculator();

// Form submission handler for calculating commission
$('#commissionForm').submit(function(event) {
  event.preventDefault();
  const lockQty = parseInt($('#lockQty').val());
  const stockQty = parseInt($('#stockQty').val());
  const barrelQty = parseInt($('#barrelQty').val());
  const commission = commissionCalculator.calculateCommission(lockQty, stockQty, barrelQty);
  $('#commissionResult').html(`
  <p>Total Sales: $${commission.totalSales.toFixed(2)}</p>
  <p>Commission: $${commission.commission.toFixed(2)}</p>
  `);
  updateSalesHistory();
});

// Form submission handler for calculating custom commission
$('#customcommissionForm').submit(function(event) {
  event.preventDefault();
  const lockQty = parseInt($('#lockQty').val());
  const stockQty = parseInt($('#stockQty').val());
  const barrelQty = parseInt($('#barrelQty').val());
  const lowRate = parseInt($('#lowcommissionRate').val());
  const mediumRate = parseInt($('#mediumcommissionRate').val());
  const highRate = parseInt($('#highcommissionRate').val());
  const commission = commissionCalculator.calculateCommission(lockQty, stockQty, barrelQty);
  commissionCalculator.setCommissionRates(lowRate, mediumRate, highRate);
  $('#customcommissionResult').html(`
  <p>Total Sales: $${commission.totalSales.toFixed(2)}</p>
  <p>Commission: $${commission.commission.toFixed(2)}</p>
  `);
  updateSalesHistory();
});

// Form submission handler for commission forecasting
$('#forecastForm').submit(function(event) {
  event.preventDefault();
  const futureLockQty = parseInt($('#futureLockQty').val());
  const futureStockQty = parseInt($('#futureStockQty').val());
  const futureBarrelQty = parseInt($('#futureBarrelQty').val());
  const currentSales = commissionCalculator.getSalesHistory().slice(-1)[0];
  const forecastedCommission = commissionCalculator.forecastCommission(
    currentSales.lockQty,
    currentSales.stockQty,
    currentSales.barrelQty,
    { lockQty: futureLockQty, stockQty: futureStockQty, barrelQty: futureBarrelQty }
  );
  $('#forecastResult').html(`
  <p>Forecasted Total Sales: $${forecastedCommission.totalSales.toFixed(2)}</p>
  <p>Forecasted Commission: $${forecastedCommission.commission.toFixed(2)}</p>
  `);
});

// Update sales history list
function updateSalesHistory() {
  $('#salesHistory').empty();
  const salesHistory = commissionCalculator.getSalesHistory();
  salesHistory.forEach(sale => {
    $('#salesHistory').append(`
        <li class="list-group-item">Total Sales: $${sale.totalSales.toFixed(2)}, Commission: $${sale.commission.toFixed(2)}</li>
      `);
  });
}

function getHistory() {
  $('#salesHistory').empty();
  const salesHistory = commissionCalculator.getSalesHistory();
  console.log(salesHistory);
  salesHistory.forEach(sale => {
    $('#salesHistory').append(`
        <li class="list-group-item">Total Sales: $${sale.totalSales.toFixed(2)}, Commission: $${sale.commission.toFixed(2)}</li>
      `);
  });
}

function clearHistory() {
  $('#salesHistory').empty();
  window.localStorage.clear();
}