const jsonServer = require("json-server");

const userServer = jsonServer.create();
const userRouter = jsonServer.router("user-db.json");
userServer.use(jsonServer.defaults());
userServer.use(userRouter);
userServer.listen(9008, () => {
  console.log("User server running!");
  console.log("Endpoints: http://localhost:9008/users");
  console.log("Endpoints: http://localhost:9008/rechargeRecords");
});

const pokemonRecordServer = jsonServer.create();
const pokemonRecordRouter = jsonServer.router("record-db.json");
pokemonRecordServer.use(jsonServer.defaults());
pokemonRecordServer.use(pokemonRecordRouter);
pokemonRecordServer.listen(9009, () => {
  console.log("Record server running!");
  console.log("Endpoints: http://localhost:9009/pokemonRecords");
});
