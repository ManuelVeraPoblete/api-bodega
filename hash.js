const bcrypt = require('bcrypt');

const run = async () => {
  const password = 'q1w2e3'; // Cambia este valor por el que quieras encriptar
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Password original:', password);
  console.log('Hash generado:', hash);
};

run();
