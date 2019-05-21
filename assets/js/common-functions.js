function showModal(modalClass, title, body, alert) {
  $(modalClass)
    .find('.modal-header')
    .addClass(alert);
  $(modalClass)
    .find('.modal-title')
    .html(title);
  $(modalClass)
    .find('.modal-body')
    .html(body);
  $(modalClass).modal('show');
}

function formatReal(numero) {
  var tmp = numero + '';
  var neg = false;

  if (tmp - Math.round(numero) == 0) {
    tmp = tmp + '00';
  }

  if (tmp.indexOf('.')) {
    tmp = tmp.replace('.', '');
  }

  if (tmp.indexOf('-') == 0) {
    neg = true;
    tmp = tmp.replace('-', '');
  }

  if (tmp.length == 1) tmp = '0' + tmp;

  tmp = tmp.replace(/([0-9]{2})$/g, ',$1');

  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');

  if (tmp.length > 9)
    tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');

  if ((tmp.length = 12))
    tmp = tmp.replace(
      /([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2.$3,$4'
    );

  if (tmp.length > 12)
    tmp = tmp.replace(
      /([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2.$3.$4,$5'
    );

  if (tmp.indexOf('.') == 0) tmp = tmp.replace('.', '');
  if (tmp.indexOf(',') == 0) tmp = tmp.replace(',', '0,');

  return neg ? '-' + tmp : tmp;
}

/**
 * Realiza uma requisição ajax.
 * @form {object} Formulário - Recebe o formulário que contém os dados da requisição. Esse parâmetro pode ser nulo.
 * @link {string} Caminho de requisição - Recebe o caminho que deverá ser feito a requisição ajax.
 * @dataReceive {string} Dados jSon - Recebe dados do tipo jSon, para serem enviados via ajax.
 */
function RequisicaoAjax(form, link, dataReceive) {
  var data;
  if (dataReceive !== null && dataReceive !== undefined) {
    data = dataReceive;
  } else {
    data = { noData: 'true' };
  }
  if (form !== null && form !== undefined) {
    return new Promise(function(resolve, reject) {
      form.ajaxSubmit({
        url: link,
        data: data,
        dataType: 'json',
        beforeSend: function() {},
        success: function(result) {
          if (result.error) {
            alert(result.error);
          } else {
          }
          resolve(result);
        }
      });
    });
  } else {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: link,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function(result) {
          if (result.error) {
            alert(result.error);
          }
          resolve(result);
        }
      });
    });
  }
}
