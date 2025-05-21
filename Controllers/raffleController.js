import express from "express";
import raffleService from '../Service/raffleService.js'
import categoryService from "../Service/categoryService.js";
import itemService from "../Service/itemService.js";

const route = express.Router();

route.get("/listRaffleName", async (request, response) => {

    try {

         const raffle = await raffleService.listRaffleName();

        console.log(raffle)

        return response.status(200).send({ message: raffle })

    } catch (err) {
        
        return response.status(500).send({ message: 'Erro ao se conectar' })
    }
})

route.post("/createRaffle", async (request, response) => {


    const { raffleTitle, categories, items } = request.body

    console.log(raffleTitle, categories, items)

    try {

        const ids_category = []

        const id_raffle = await raffleService.createRaffle(raffleTitle)

        for (const categorie of categories) {

            const id_category = await categoryService.createCategory(categorie, id_raffle)

            ids_category.push(id_category)
        }


        for (const [key, value] of Object.entries(items)) {

            const id_category = key.includes("Cat1") ? ids_category[0] : ids_category[1];

            console.log(`Cadastrando item "${value}" na categoria ID ${id_category}`);

            await itemService.createItem(value, id_category);
        }

        return response.status(200).send({ message: `Tá funcionando muleke` })


    } catch (err) {

        console.log(err)
        return response.status(500).send({ message: "erro ao inserir item" })

    }

})



export default route;