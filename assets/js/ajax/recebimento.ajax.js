$(document).ready(function() {
  // ADICIONANDO RECEBIMENTO

  $('.app-form-recebimento').submit(function() {
    $('.app-trans-pessoa').blur();
    $('.app-trans-categoria').blur();
    var form = $(this);
    let parcelamento_1 = $('#parcelamento_1').val();
    let parcelamento_2 = $('#parcelamento_2').val();
    let parcelamento_3 = $('#parcelamento_3').val();
    let parcelamento_4 = $('#parcelamento_4').val();
    let parcelamento_5 = $('#parcelamento_5').val();
    let parcelamento_6 = $('#parcelamento_6').val();
    let parcelamentos = {
      parcelamento_1,
      parcelamento_2,
      parcelamento_3,
      parcelamento_4,
      parcelamento_5,
      parcelamento_6
    };
    let result = RequisicaoAjax(
      form,
      'http://localhost/projetofinanceiro/recebimento_ajax',
      parcelamentos
    );
    result.then(function(result) {
      if (!result.error) {
        showModal(
          '.app-modal-message',
          'Operação concluída',
          '<p>' + result.success + '</p>'
        );
      } else {
        showModal(
          '.app-modal-message',
          'Erro !',
          '<p>Não foi possível concluir a operação!</p>',
          'alert-success'
        );
      }
    });

    return false;
  });

  $('.j_formsubmit_parcelamento').submit(function() {
    $('.app-concluir-recebimento').click();
    return false;
  });
});
