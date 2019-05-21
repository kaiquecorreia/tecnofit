// CONTAS
$(document).ready(function() {
  $('#trans_conta').val($('#select-conta').val());
  function AlterarValorBr(valor) {
    var valorConvertido = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return valorConvertido;
  }

  function TableContaUpdate(data) {
    let checked;
    if (data.con_principal == 0) {
      checked = '';
    } else {
      checked = 'checked';
    }
    let valorConvertido = AlterarValorBr(data.con_saldo);

    var tabelaContas =
      '<tr id="' +
      data.con_id +
      '" >' +
      '<td><input type="radio" name="radioContas" id="radioConta' +
      data.con_id +
      '" value="' +
      data.con_id +
      checked +
      '"></td> ' +
      '<td>' +
      data.con_name +
      '</td>' +
      '<td>' +
      data.tipo_descricao +
      '</td>' +
      '<td>' +
      valorConvertido +
      '</td>' +
      '<td><button rel="' +
      data.con_id +
      '" type="button" id="button-excluir-conta" class="button-excluir-conta"><i class="fas fa-trash-alt"></i></button> </td>' +
      '</tr>';

    $('#table-contas')
      .find('.j-insert-conta')
      .append(tabelaContas);
  }

  $('#select-conta').change(function() {
    let id = $(this).val();
    $('#trans_conta').val(id);
  });

  $('.j-insert-conta').on('click', '.button-excluir-conta', function() {
    let con_id = $(this).attr('rel');
    $(this)
      .closest('tr')
      .remove();
    $.ajax({
      url: 'http://localhost/projetofinanceiro/conta_ajax',
      data: { action: 'delete', con_id },
      dataType: 'json',
      type: 'POST',

      success: function(result) {
        if (result.error) {
          alert(result);
        }
      }
    });
  });

  $('.radio-conta-principal').change(function() {
    const con_id = $(this)
      .closest('tr')
      .attr('id');

    let data = { con_id: con_id, action: 'alterar-conta-principal' };
    $.ajax({
      url: 'http://localhost/projetofinanceiro/conta_ajax',
      data: data,
      dataType: 'json',
      type: 'POST',

      success: function(result) {
        if (result.error) {
          alert(result);
        } else {
        }
      }
    });
  });

  $('.button-adicionar-conta').click(function() {
    tipo = $('#conta_tipo_id').val();
    nome = $('#con_name').val();
    saldo = $('#con_saldo').val();
    principal = $('#con_principal').is(':checked');

    if ($('#con_principal').is(':checked')) {
      principal = 1;
    } else {
      principal = 0;
    }
    let data = {
      action: 'create',
      con_tipo: tipo,
      con_name: nome,
      con_saldo: saldo,
      con_principal: principal
    };

    $.ajax({
      url: 'http://localhost/projetofinanceiro/conta_ajax',
      data: data,
      dataType: 'json',
      type: 'POST',

      success: function(result) {
        if (result.error) {
          alert(result);
        } else {
          TableContaUpdate(result.table);
          $('.form-adicionar-conta').hide();
          $('.form-adicionar-conta')
            .find('#con_name')
            .val('');
          $('.form-adicionar-conta')
            .find('#con_saldo')
            .val('');
          $('.form-adicionar-conta')
            .find('#con_principal')
            .attr('checked', false);
        }
      }
    });
  });
  //   FIM DOCUMENT READY
});
