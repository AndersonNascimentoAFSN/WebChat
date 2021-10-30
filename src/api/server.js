const { serverHttp } = require('./http');
require('../sockets/chat');

const PORT = process.env.PORT || 3000;

serverHttp.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));