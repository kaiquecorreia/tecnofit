$(document).ready(function() {
  $.typeahead({
    input: '.js-typeahead-categorias',
    minLength: 0,
    maxItem: 15,
    order: 'asc',
    searchOnFocus: true,
    source: {
      pessoa: {
        ajax: {
          type: 'POST',
          url: 'http://localhost/projetofinanceiro/categoria_ajax',
          data: {
            action: 'read-descricao'
          }
        }
      }
    },
    callback: {
      onInit: function(node) {
        console.log('Typeahead Initiated on ' + node.selector);
      }
    }
  });

  $('.app-trans-categoria').blur(function() {
    let categoria = $('.app-trans-categoria').val();
    let data = { action: 'return-id', categoria };
    let result = RequisicaoAjax(
      null,
      'http://localhost/projetofinanceiro/categoria_ajax',
      data
    );
    result.then(function(result) {
      if (!result.error) {
        if (result.id) {
          $('#trans_categoria').val(result.id);
        } else {
          $('#trans_categoria').val('');
        }
      }
    });

    // $.ajax({
    //   url: 'http://localhost/projetofinanceiro/categoria_ajax',
    //   data: { action: 'return-id', categoria },
    //   dataType: 'json',
    //   type: 'POST',

    //   success: function(result) {
    //     if (result.error) {
    //       alert(result);
    //     } else {
    //       if (result.id) {
    //         $('#trans_categoria').val(result.id);
    //       } else {
    //         $('#trans_categoria').val('');
    //       }
    //     }
    //   }
    // });
  });
});
