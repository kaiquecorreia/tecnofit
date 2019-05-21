$(document).ready(function() {
  function VerifDepartament() {
    if ($('#call_departament').val() == 'true') {
      $('#departament-warning').modal('show');
      return false;
    } else {
      return true;
    }
  }

  $('#call_departament').change(function() {
    const departament = $(this).val();
    const path = BASE_PATH + 'departament/selected-departament';
    const data = { departament };
    let result = RequisicaoAjax(null, path, data);
    result.then(function(result) {
      if (result.result) {
      }
    });
  });

  $('.call-wait').click(function() {
    if (VerifDepartament()) {
      const call_id = $(this).attr('id');
      const departament = $('#call_departament').val();

      const path = BASE_PATH + 'wait/end';
      const data = { departament, call_id };
      let result = RequisicaoAjax(null, path, data);
      result.then(function(result) {
        if (result.result) {
        }
      });

      window.location.reload();
    }
  });

  setInterval(function() {
    const beep = $('#app-beep').val();
    if (beep == 1) {
      PlayAudio();
    }
  }, 2000);

  function PlayAudio() {
    $('#app-beep-alert')[0].play();
  }
});
