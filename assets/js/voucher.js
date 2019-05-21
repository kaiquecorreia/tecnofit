$(document).ready(function() {
  $('.app-voucher-message').hide();
  $('#app-form-voucher').submit(function() {
    $('#app-button-voucher').hide();
    $('.app-spin-voucher').fadeToggle();
    const form = $(this);
    const path = BASE_PATH + '/voucher';
    const data = { nodata: '' };
    let result = RequisicaoAjax(form, path, data);
    result.then(function(result) {
      $('.app-spin-voucher').fadeToggle();
      $('#app-button-voucher').show();
      $('.app-voucher-message').html(`<strong>${result.message}</strong>`);
      $('.app-voucher-message').fadeIn(5000, function() {
        window.location.reload();
      });
    });
    return false;
  });
  // function Monitoramento() {
  //   setInterval(function() {
  //     let main = $('#app-input-call-main').val();
  //     const path = BASE_PATH + 'display/monitoramento';
  //     let data = { last: main };
  //     let result = RequisicaoAjax(null, path, data);
  //     result.then(function(result) {
  //       if (result.call_main) {
  //         setCalls(result);
  //         PlayAudio();
  //       }
  //     });
  //   }, 1000);
  // }
});
