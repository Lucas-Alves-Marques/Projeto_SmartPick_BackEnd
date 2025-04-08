import express from "express";
import service from '../Service/categoryService.js'

const route = express.Router();

// GET - Categorias por raffle
route.get("/raffle/:id_raffle", async (request, response) => {
    try {
        const { id_raffle } = request.params;
        const categories = await service.listCategoriesByRaffle(id_raffle);

        if (categories.length === 0) {
            return response.status(404).send({ message: "Nenhuma categoria encontrada para esse sorteio." });
        }

        return response.status(200).send(categories);
    } catch (error) {
        console.error("Erro no GET /raffle/:id_raffle", error);
        return response.status(500).send({ message: "Erro interno do servidor." });
    }
});

// POST - Criar categoria
route.post("/", async (request, response) => {
    const { title, id_raffle } = request.body;

    try {
        await service.createCategory(title, id_raffle);
        return response.status(201).send({ message: "Categoria criada com sucesso." });
    } catch (err) {
        console.error("Erro no POST /categories", err);
        return response.status(500).send({ message: "Erro ao criar categoria." });
    }
});

// PUT - Atualizar categoria
route.put("/:id_category", async (request, response) => {
    const { id_category } = request.params;
    const { title, id_raffle } = request.body;

    try {
        await service.updateCategory(id_category, title, id_raffle);
        return response.status(200).send({ message: "Categoria atualizada com sucesso." });
    } catch (err) {
        console.error("Erro no PUT /:id_category", err);
        return response.status(500).send({ message: "Erro ao atualizar categoria." });
    }
});

// DELETE - Deletar categoria
route.delete("/:id_category", async (request, response) => {
    const { id_category } = request.params;

    try {
        await service.deleteCategory(id_category);
        return response.status(200).send({ message: "Categoria deletada com sucesso." });
    } catch (err) {
        console.error("Erro no DELETE /:id_category", err);
        return response.status(500).send({ message: "Erro ao deletar categoria." });
    }
});

export default route;
