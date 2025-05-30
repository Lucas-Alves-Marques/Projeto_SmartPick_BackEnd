import express, { request, response } from "express";
import raffleService from '../Service/raffleService.js'
import categoryService from "../Service/categoryService.js";
import itemService from "../Service/itemService.js";

const route = express.Router();

route.get("/listRaffleName", async (request, response) => {

    try {

        const raffle = await raffleService.listRaffleName();

        return response.status(200).send({ message: raffle })

    } catch (err) {

        return response.status(500).send({ message: 'Erro ao se conectar' })
    }
})

route.post("/createRaffle", async (request, response) => {


    const { raffleTitle, categories, items } = request.body

    try {

        const ids_category = []

        const id_raffle = await raffleService.createRaffle(raffleTitle)

        for (const categorie of categories) {

            const id_category = await categoryService.createCategory(categorie, id_raffle)

            ids_category.push(id_category)
        }


        for (const [key, value] of Object.entries(items)) {

            const id_category = key.includes("Cat1") ? ids_category[0] : ids_category[1];

            // console.log(`Cadastrando item "${value}" na categoria ID ${id_category}`);

            await itemService.createItem(value, id_category);
        }

        return response.status(200).send({ message: `Tá funcionando muleke` })


    } catch (err) {

        console.log(err)
        return response.status(500).send({ message: "erro ao inserir item" })

    }

})

route.get("/listRaffle/:id_raffle", async (request, response) => {

    try {

        const { id_raffle } = request.params;

        const data_raffle = {

            title: null,
            categories: {},
            items: {}

        };

        async function listRaffle() {

            const title_raffle = await raffleService.getRaffle(id_raffle);

            data_raffle.title = title_raffle[0].name;

            const categories_raffle = await categoryService.listCategory(id_raffle);

            const id_cat = [];

            await categories_raffle.forEach((cat) => {

                data_raffle.categories[cat.id_category] = cat.title

                id_cat.push(cat.id_category);

            });

            const items_raffle = await itemService.listItems(id_cat[0], id_cat[1]);

            data_raffle.items = items_raffle;

        }

        await listRaffle()

        return response.status(200).send({ message: data_raffle })


    }
    catch (err) {

        return response.status(500).send({ message: err })
    }


})

route.put("/uptadeRaffle/:id_raffle", async (request, response) => {

    const { id_raffle } = request.params;

    const { raffleTitle, categories, items } = request.body

    try {

        console.log(items)

        await raffleService.updateNameRaffle(raffleTitle, id_raffle)

        Object.entries(categories).map(async (cat) => {

            if (cat[1] == ' ') {

                await items.map((item)=>{

                    if(item.id_category == cat[0]){

                        console.log(item.id_item)

                       itemService.deleteItem(item.id_item)

                    }

                })

                await categoryService.deleteCategory(parseInt(cat[0]))

            }

            else {

                await categoryService.updateCategory(cat[1], cat[0])
            }



        })

        return response.status(200).send({ message: `Sorteio Atualizado` })



    } catch (err) {

        console.log(err)


    }

})

export default route;