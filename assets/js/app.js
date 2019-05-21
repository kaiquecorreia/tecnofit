function PassMonitor() {
  const path = BASE_PATH + 'monitor/pass-monitor';
  const data = { 'no-data': 'no-data' };
  let result = RequisicaoAjax(null, path, data);
  result.then(function(result) {
    if (result) {
      window.location.reload();
    }
    setTimeout(() => {
      PassMonitor();
    }, 1000);
  });
}

$('.app-spin-voucher').hide();
