(function($) {
  "use strict"; // Start of use strict

  var url_service = 'https://contetrack.com';
  var url_api_enviar_pedido = '/trabajos/api/v1/pedidos/create_from_web/';
  
  $('#btn_enviar_pedido').click(function(){
    $('#frm_envio').hide();
    $('#div_loading').show();
    var url = url_service + url_api_enviar_pedido;
    var lugar = $('#direccion').val() + '; ' + $('#direccion_zona').val() + '; ' + $('#direccion_ayuda').val();
    var data_send = {
                cliente_nombre: $('#cliente_nombre').val(),
                cliente_tel: $('#cliente_tel').val(),
                cliente_clave: $('#cliente_clave').val(),
                cantidad_solicitada: $('#cantidad_solicitada').val(),
                ayuda_o_referencias_para_ubicacion: lugar,
                'g-recaptcha-response': $('#g-recaptcha-response').val()
                };
    var xhr = $.post(url, data_send);
    
    xhr.done(function(data) {
      var resp = '';
      if (data.ok) {
        resp = 'Tu pedido se envio correctamente. Identificador de referencia: ' + data.id;
      }
      else {
        resp = 'ERROR: ' + data.error;
      }
      $('#div_loading').hide();
      $('#div_response').show();
      $('#response_txt').html(resp);
    });
    
    xhr.fail(function(xhr, status, error) {
      var resp = 'ERROR: status: ' + status + ' detalle: ' + error;
      $('#div_loading').hide();
      $('#div_response').show();
      $('#response_txt').html(resp);
    });
  });

})(jQuery); // End of use strict