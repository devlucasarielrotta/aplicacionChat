const socket = io();

Swal.fire({
    title:'Saludos',
    text: 'Mensaje inicial',
    icon: 'success'
})


let user ;

const chatBox = document.getElementById('chatBox');

Swal.fire({
    title:'Identificate',
    text: 'Ingresa el usuario para identificarte en el chat',
    input: 'text',
    inputValidator: (value) => {
         if(!value){
            return  "Necesitas escribir un nombre de usuario para comenzar"
         }
    },
    allowOutsideClick:false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})



chatBox.addEventListener('keyup',evt => {
    
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0 ) {
            
            socket.emit('mensaje',{
                user,
                message:chatBox.value
                
            })
        }
        chatBox.value='';
      
    }
})

socket.on('messageLogs', data => {
    let log = document.querySelector('#messageLogs');
    let messages = '';

    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`;
    })

    log.innerHTML = messages;

})

socket.on('newUserConnected',data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmaButton:false,
        timer:3000,
        title:`${data} se ha conectado`,
        icon:'success'
    })
})