const net = require('net');

const serverPort = 12345;  // Puerto en el que deseas que el servidor escuche

const server = net.createServer((socket) => {
  console.log('GPS se ha conectado.');

  socket.on('data', (data) => {
    const requestData = data.toString();
    console.log('Datos recibidos del GPS:', requestData);
    // Aquí puedes procesar los datos como desees.
  });

  socket.on('end', () => {
    console.log('GPS se ha desconectado.');
  });

  socket.on('error', (err) => {
    console.error('Error de conexión:', err);
  });
});

server.listen(serverPort, () => {
  console.log(`El servidor GPS está escuchando en el puerto ${serverPort}`);
});
