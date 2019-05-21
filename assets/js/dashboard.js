$(document).ready(function() {
  $(document).keypress(function(e) {
    if ($('#calls-tab').hasClass('active')) {
      if (!$('#dashboard-insert-name').hasClass('show')) {
        const path = BASE_PATH + 'category/shortcuts';
        const call_departament_id = $('#call_departament').val();
        const data = { keyCode: e.keyCode, call_departament_id };
        let result = RequisicaoAjax(null, path, data);
        result.then(function(result) {});
      }
    }
  });

  function VerifyDepartament() {
    if ($('#call_departament').val() == 'true') {
      $('#departament-warning').modal('show');
      return false;
    } else {
      return true;
    }
  }

  function VerifyEspera() {
    if ($('#call_departament').val() == 'true') {
      $('#departament-warning').modal('show');
      return false;
    } else {
      return true;
    }
  }
  function RenderHistoricCalls(text) {
    //
    const path = BASE_PATH + 'dashboard/historic-calls';
    const data = { filter: text };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
      const table = result.filter;
      $('.app-table-historic').html(table);
    });
  }

  function SendToWait(data) {
    if (VerifyDepartament()) {
      const path = BASE_PATH + 'dashboard/dashboard-wait';
      let result = RequisicaoAjax(null, path, data);
      result.then(function(result) {
        if (result.result) {
        }
      });
      window.location.reload();
    }
  }

  RenderHistoricCalls('');

  $(document).on('click', '.app-call-pass', function() {
    if (VerifyDepartament()) {
      const path = BASE_PATH + 'dashboard/call';
      const call_departament_id = $('#call_departament').val();
      const call_id = $(this).attr('id');
      const data = { call_departament_id, call_id };
      let result = RequisicaoAjax(null, path, data);
      result.then(function(result) {
        if (result.result) {
        }
      });
    }
  });

  // $('.app-table-historic .table').click(function() {
  //   alert('teste');
  // });

  $('.app-wait').click(function() {
    // SendToWait();
    if (VerifyDepartament()) {
      $('#app-input-call-wait-id').val($(this).attr('id'));
      $('#dashboard-insert-name').modal('show');
    }
  });

  $('#app-button-insert-name').on('click', function() {
    const call_name = $('#app-input-call-name').val();
    const call_id = $('#app-input-call-wait-id').val();
    const data = { call_id, call_name };
    SendToWait(data);
  });

  $('.app-confirmation-remove').click(function() {
    const path = BASE_PATH + 'dashboard/dashboard-confirmation-remove';
    const call_id = $(this).attr('id');
    const data = { call_id };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
      if (result.result) {
      }
    });
    window.location.reload();
  });

  $('.app-call-departament').change(function() {
    const departament = $(this).val();

    const path = BASE_PATH + 'departament/selected-departament';
    const data = { departament };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
      if (result.result) {
      }
    });
  });

  $('#app-input-filter').keyup(function() {
    const filter = $(this).val();
    RenderHistoricCalls(filter);
  });
});

PassMonitor();

function PreferencialMonitor() {
  const path = BASE_PATH + 'dashboard/dashboard-monitor';
  const data = { 'no-data': 'no-data' };
  let result = RequisicaoAjax(null, path, data);
  result.then(function(result) {
    if (result) {
      const warning = `
      <p>Existem ${
        result.total
      } cliente(s) preferenciais esperando a mais de 20 minutos !</p>
      <p>Maior tempo de espera: ${result.time_max} minutos.</p>
      `;
      $('#app-modal-body').html(warning);
      $('#preferencial-warning').modal('show');
    }
  });
}
