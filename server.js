// Servidor
const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor online na porta 3000!")
});

// tarefas armazenadas em memoria
let tarefas = []

// criar uma tarefa
app.post("/tarefas", (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({ erro: "O título é obrigatório." });
    }

    const novaTarefa = {
        id: Date.now(),
        titulo,
        feita: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// listar tarefas
app.get("/tarefas", (req, res) => {
    res.json(tarefas);
});

// marcar tarefa como feita
app.put("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
    }

    tarefa.feita = true;
    res.json(tarefa);
});

// deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
    const id = Number(req.params.id);

    tarefas = tarefas.filter(t => t.id !== id);

    res.json({ mensagem: "Tarefa deletada com sucesso." });
});

