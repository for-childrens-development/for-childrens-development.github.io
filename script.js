$(document).ready(function() {

  const apiRoot = 'https://stocks-app-kuba-04.herokuapp.com/v1/stocks';
  const avApiRoot = 'https://stocks-app-kuba-04.herokuapp.com/v1/av/';

  var datatableRowTemplate = $('[data-datatable-row-template]').children()[0];
  var stocksContainer = $('[data-stocks-container]');

  // init
  getAllStocks();

  // refresh prices
  setInterval(updateStockPrice, (60 * 1000));

  function createElement(data) {
    var element = $(datatableRowTemplate).clone();

    element.attr('data-stock-id', data.id);
    element.find('[data-stock-name-section] [data-stock-name-paragraph]').text(data.name);
    element.find('[data-stock-name-section] [data-stock-name-input]').val(data.name);

    element.find('[data-stock-ticker-section] [data-stock-ticker-paragraph]').text(data.ticker);
    element.find('[data-stock-ticker-section] [data-stock-ticker-input]').val(data.ticker);

    element.find('[data-stock-price-section] [data-stock-price-paragraph]').text(data.price);
    element.find('[data-stock-price-section] [data-stock-price-input]').val(data.price);

    return element;
  }

  function handleDatatableRender(data) {
    stocksContainer.empty();
    data.forEach(function(stock) {
      createElement(stock).appendTo(stocksContainer);
    });
  }

  function getAllStocks() {

    $.ajax({
      url: apiRoot,
      method: 'GET',
      success: handleDatatableRender
    });
  }

  function updateStockPrice() {

    $.ajax({
      url: apiRoot,
      method: 'GET',
      success: getAllStocks
    });
  }

  function handleStockUpdateRequest() {
    var parentEl = $(this).parent().parent();
    var stockId = parentEl.attr('data-stock-id');
    var stockName = parentEl.find('[data-stock-name-input]').val();
    var stockTicker = parentEl.find('[data-stock-ticker-paragraph]').text();

    $.ajax({
      url: apiRoot + '/' + stockTicker +
        '&' + stockName,
      method: 'PUT',
      success: function(data) {
        parentEl.attr('data-stock-id', data.id).toggleClass('datatable__row--editing');
        parentEl.find('[data-stock-name-paragraph]').text(stockName);
        parentEl.find('[data-stock-ticker-paragraph]').text(stockTicker);
      }
    });
  }

  function handleStockDeleteRequest() {
    var parentEl = $(this).parent().parent();
    var stockId = parentEl.attr('data-stock-id');
    var requestUrl = apiRoot + '/';

    $.ajax({
      url: requestUrl + stockId,
      method: 'DELETE',
      success: function() {
        parentEl.slideUp(400, function() { parentEl.remove(); });
      }
    })
  }

  function handleStockSubmitRequest(event) {
    event.preventDefault();

    var stockName = $(this).find('[name="name"]').val();
    var stockTicker = $(this).find('[name="ticker"]').val();
    var stockPrice = $(this).find('[name="price"]').val();

    $.ajax({
      url: apiRoot,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        name: stockName,
        ticker: stockTicker,
        price: stockPrice
      }),
      complete: function(data) {
        if(data.status === 200) {
          getAllStocks();
        }
      }
    });
  }

  function toggleEditingState() {
    var parentEl = $(this).parent().parent();
    parentEl.toggleClass('datatable__row--editing');
    var stockName = parentEl.find('[data-stock-name-paragraph]').text();

    parentEl.find('[data-stock-name-input]').val(stockName);
  }

  $('[data-stock-add-form]').on('submit', handleStockSubmitRequest);

  stocksContainer.on('click','[data-stock-edit-button]', toggleEditingState);
  stocksContainer.on('click','[data-stock-edit-abort-button]', toggleEditingState);
  stocksContainer.on('click','[data-stock-submit-update-button]', handleStockUpdateRequest);
  stocksContainer.on('click','[data-stock-delete-button]', handleStockDeleteRequest);

});
