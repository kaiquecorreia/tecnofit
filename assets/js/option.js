$(document).ready(function() {
  // if ($('#app-input-print').val() == 'print') {
    // $('#app-printing').modal('show');

    // setTimeout(function() {
      // $('#app-printing').modal('hide');
    // }, 1500);
  // }
  $('.app-pass-tipo').click(function(){
	$('#app-printing').modal('show');
    const tipo_id = $(this).attr('rel');
	const path = BASE_PATH + 'option/password';
    const data = { tipo: tipo_id };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
		 $('#app-printing').modal('hide');
    });
	
  });
  
  $('.app-single-voucher').click(function(){
	$('#app-printing').modal('show');
	const path = BASE_PATH + 'option/voucher';
    const data = { data: 'vazio' };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
		$('#app-printing').modal('hide');
    });
	
  });
});
