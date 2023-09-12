// si ponemos esto lo que va hacer es conectarnos al socket que hay
// por defecto, cosa que no queremos, primero queremos conectar a
// un namespace especifico
// const socket = io();

const user = prompt("Escribe tu usuario");

const profesores = ["RetaxMaster", "juandc", "GNDX"];

let socketNameSpace, group;

const chat = document.querySelector("#chat");
const nameSpace = document.querySelector("#namespace");

if (profesores.includes(user)) {
  // acá estamos conectando a un namespace especifico
  socketNameSpace = io("/teachers");
  group = "teachers";
} else {
  socketNameSpace = io("/students");
  group = "students";
}

socketNameSpace.on("connect", () => {
  nameSpace.textContent = group;
});