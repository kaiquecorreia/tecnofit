$(document).ready(function() {
  $('#trans_parcelamento').change(function() {
    if ($(this).val() == 2) {
      let valor = $('#pag_valor').val();
      let data = $('#pag_data').val();

      $('#parcelamento-valor-total').val(valor);
      $('#pag_parcelamento').val(1);
      $('#pag_frequencia').val(1);
      $('#parcelamento-valor-total').val(valor);
      TableParcelamentoUpdate(1, valor, data, 1);
      $('.app-modal-parcelamento').modal('show');
      $(this).val(1);
    }
  });

  $('#parcelamento-valor-total').change(function() {
    let parcelas = $('#parcelamento-numero-parcelas').val();
    let data = $('#pag_data').val();
    let frequencia = $('#parcelamento-frequencia').val();
    let valor = $(this).val();
    $('#pag_valor').val(valor);
    TableParcelamentoUpdate(parcelas, valor, data, frequencia);
  });
  $('#parcelamento-frequencia').change(function() {
    let parcelas = $('#parcelamento-numero-parcelas').val();
    let data = $('#pag_data').val();
    let frequencia = $(this).val();
    let valor = $('#parcelamento-valor-total').val();
    $('#pag_frequencia').val($(this).val());
    TableParcelamentoUpdate(parcelas, valor, data, frequencia);
  });

  $('#parcelamento-numero-parcelas').change(function() {
    let parcelas = $(this).val();
    let valor = $('#parcelamento-valor-total').val();
    let data = $('#pag_data').val();
    let frequencia = $('#parcelamento-frequencia').val();
    $('#pag_parcelamento').val($(this).val());
    TableParcelamentoUpdate(parcelas, valor, data, frequencia);
  });

  $('.j-insert-parcelamentos').on('click', '.parcelamento_pago', function() {
    if ($(this).is(':checked')) {
      let valor = $(this).attr('numero-parcelamento');
      id = '#parcelamento_' + valor;
      $(id).val('1');
    } else {
      let valor = $(this).attr('numero-parcelamento');
      id = '#parcelamento_' + valor;
      $(id).val('0');
    }
  });

  function TableParcelamentoUpdate(parcelas, valor, data, frequencia) {
    $.ajax({
      url: 'http://localhost/projetofinanceiro/parcelamento_ajax',
      data: {
        action: 'retorna-valor-parcelas',
        parcelas,
        valor,
        data,
        frequencia
      },
      dataType: 'json',
      type: 'POST',

      success: function(result) {
        if (result.error) {
          alert(result);
        } else {
          var tr;
          let i = 0;
          $.each(result.valorParcelas, function(key, value) {
            totalParcelas = result.totalParcelas;

            let valor = formatReal(value);
            tr +=
              '<tr id="parcelamento_' +
              key +
              '" >' +
              '<td>' +
              key +
              '/' +
              totalParcelas +
              '</td>' +
              '<td>' +
              result.datasConvertidas[i] +
              '</td>' +
              '<td>R$ ' +
              valor +
              '</td>' +
              '<td><label class="switch"><input type="checkbox" class="parcelamento_pago" numero-parcelamento="' +
              key +
              '"><span class="slider round"> </label></td>' +
              '<td> <a><i class="fas fa-trash"></i></a></td></tr>';

            i++;
          });
          $('#table-parcelamento')
            .find('.j-insert-parcelamentos')
            .html(tr);
        }
      }
    });
  }
});
