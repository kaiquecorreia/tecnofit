$(document).ready(function() {
  // VerifyUrl();
  // PlayAudio();
  // function VerifyUrl() {
  //   var url_atual = window.location.href;
  //   var url = url_atual.substring(31, url_atual.length);

  //   if (url == 'display') {
  //   }
  // }
  Monitoramento();
  function Monitoramento() {
    setInterval(function() {
      let main = $('#app-input-call-main').val();
      const path = BASE_PATH + 'display/monitoramento';
      let data = { last: main };
      let result = RequisicaoAjax(null, path, data);
      result.then(function(result) {
        if (result.call_main) {
          setCalls(result);
          PlayAudio();
        }
      });
    }, 1000);
  }

  function setCalls(calls) {
    let main = '';
    let mainDetails = '';
    if (calls.call_main.call_name) {
      main = calls.call_main.call_name;
      mainDetails =
        calls.call_main.tipo_sigla +
        calls.call_main.call_number +
        ' | ' +
        calls.call_main.dep_descricao;
    } else {
      main = calls.call_main.tipo_sigla + calls.call_main.call_number;
      mainDetails = calls.call_main.dep_descricao;
    }

    $('#app-call-main').html(main);
    $('#app-call-main-dep').html(mainDetails);
    let previousCalls = '';
    let previousDeps = '';
    $.each(calls.calls, function(index, value) {
      previousCalls += ` <h2 class="card-text text-center">
                    ${value.tipo_sigla}${value.call_number}
                  </h2>`;
      let callName = value.call_name ? value.call_name + ' | ' : '';

      previousDeps += ` <h2 class="card-text text-center">
                    ${callName}${value.dep_descricao}
                  </h2>`;
    });
    $('#app-previous-calls').html(previousCalls);
    $('#app-previous-deps').html(previousDeps);
  }

  function PlayAudio() {
    $('#app-audio-alert')[0].play();
  }
});
