import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];

server.get("/holidays", (req, res) => res.send(holidays));

server.get("/holidays/:idMonth", (req, res) => {
  const idMonth = parseInt(req.params.idMonth);
  const holidaysMonth = holidays.filter((el) => new Date(el.date).getMonth() + 1 === idMonth);
  res.send(holidaysMonth);
});

server.get("/is-today-holiday", (req, res) => {
  const today = new Date();
  const todayString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const [holiday] = holidays.filter((el) => el.date === todayString);
  if (holiday !== undefined) res.send(`Sim, hoje é ${holiday.name}`);
  else res.send("Não, hoje não é feriado");
});

server.listen(4000);
