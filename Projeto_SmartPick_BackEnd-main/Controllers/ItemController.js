import express from "express";
import service from '../Service/itemService.js';


const route = express.Router();

// GET - Itens por categoria
route.get("/category/:id_category", async (request, response) => {
    try {
        const { id_category } = request.params;
        const items = await service.listItemsByCategory(id_category);

        if (items.length === 0) {
            return response.status(404).send({ message: "Nenhum item encontrado para essa categoria." });
        }

        return response.status(200).send(items);
    } catch (error) {
        console.error("Erro no GET /category/:id_category", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

// POST - Criar item
route.post("/", async (request, response) => {
    const { id_category, name } = request.body;

    try {
        await service.createItem(id_category, name);
        return response.status(201).send({ message: "Item criado com sucesso." });
    } catch (err) {
        console.error("Erro no POST /items", err);
        return response.status(500).send({ message: "Erro ao criar item." });
    }
});

// PUT - Atualizar item
route.put("/:id_item", async (request, response) => {
    const { id_item } = request.params;
    const { id_category, name } = request.body;

    try {
        await service.updateItem(id_item, id_category, name);
        return response.status(200).send({ message: "Item atualizado com sucesso." });
    } catch (err) {
        console.error("Erro no PUT /:id_item", err);
        return response.status(500).send({ message: "Erro ao atualizar item." });
    }
});

// DELETE - Deletar item
route.delete("/:id_item", async (request, response) => {
    const { id_item } = request.params;

    try {
        await service.deleteItem(id_item);
        return response.status(200).send({ message: "Item deletado com sucesso." });
    } catch (err) {
        console.error("Erro no DELETE /:id_item", err);
        return response.status(500).send({ message: "Erro ao deletar item." });
    }
});

export default route;
