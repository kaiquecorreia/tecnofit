$(document).ready(function() {
  $.typeahead({
    input: '.js-typeahead-pessoas',
    minLength: 0,
    maxItem: 15,
    order: 'asc',
    searchOnFocus: true,
    source: {
      pessoa: {
        ajax: {
          type: 'POST',
          url: 'http://localhost/projetofinanceiro/pessoa_ajax',
          data: {
            action: 'read-nomes'
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

  $('.app-trans-pessoa').blur(function() {
    let pessoa = $('.app-trans-pessoa').val();
    let data = { action: 'return-id', pessoa };
    let result = RequisicaoAjax(
      null,
      'http://localhost/projetofinanceiro/pessoa_ajax',
      data
    );
    result.then(function(result) {
      if (!result.error) {
        if (result.id) {
          $('#trans_pessoa').val(result.id);
        } else {
          $('#trans_pessoa').val('');
        }
      }
    });
    // $.ajax({
    //   url: 'http://localhost/projetofinanceiro/pessoa_ajax',
    //   data: { action: 'return-id', pessoa },
    //   dataType: 'json',
    //   type: 'POST',
    //   success: function(result) {
    //     if (result.error) {
    //       alert(result);
    //     } else {
    //       if (result.id) {
    //         $('#trans_pessoa').val(result.id);
    //       } else {
    //         $('#trans_pessoa').val('');
    //       }
    //     }
    //   }
    // });
  });
});
