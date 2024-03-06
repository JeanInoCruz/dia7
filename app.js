import http from "http";
import fs from "node:fs";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  switch (url) {
    case "/":
      fs.readFile("../dia7/index.html", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error interno del servidor");
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;
    case "/clientes":
      if (method === "GET") {
        const clientes = [
          { id: 1, nombre: "Cliente 1" },
          { id: 2, nombre: "Cliente 2" },
          { id: 3, nombre: "Cliente 3" },
        ];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(clientes));
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Método no permitido");
      }
      break;
    case "/save":
      if (method === "POST") {
        const clientes = [
          { id: 1, nombre: "Cliente 1" },
          { id: 2, nombre: "Cliente 2" },
          { id: 3, nombre: "Cliente 3" },
        ];
        fs.writeFile("clientes.json", JSON.stringify(clientes), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error interno del servidor");
            return;
          }
          console.log("Datos de clientes guardados correctamente.");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Datos de clientes guardados correctamente.");
        });
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Método no permitido");
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Página no encontrada");
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
