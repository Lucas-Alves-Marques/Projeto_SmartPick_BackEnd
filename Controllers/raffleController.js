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

        return response.status(500).send({ message: err })
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

        return response.status(500).send({ message: err })

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

    // console.log(id_raffle)
    // console.log(raffleTitle)
    // console.log(categories)
    // console.log(items)

    try {

        await raffleService.updateNameRaffle(raffleTitle, id_raffle)

        let idNewCategory = 0;

        for (const [key, value] of Object.entries(categories)) {

            if (key === "NewCategory") {

                const id_cat = await categoryService.createCategory(value, id_raffle);

                idNewCategory = id_cat;

            } else if (value === "DeleteCat") {

                await itemService.deleteItemFromCategory(key);

                await categoryService.deleteCategory(key);

            } else {

                await categoryService.updateCategory(value, key);

            }
        }

        console.log(idNewCategory)

        for (const item of items) {

            if (String(item.id_item).includes('NewItem')) {

                if (item.id_category == 'NewCategory') {

                    console.log(idNewCategory)

                    await itemService.createItem(item.name, idNewCategory)

                }

                else {

                    console.log('Primeiro else')

                    await itemService.createItem(item.name, item.id_category)
                }


            }

            else if (item.name == 'deleteItem') {

                await itemService.deleteItem(item.id_item)
            }

            else {

                await itemService.updateItem(item.name, item.id_item)

            }


        }

        return response.status(200).send({ message: `Sorteio Atualizado` })


    } catch (err) {

        return response.status(500).send({ message: err })


    }

})

route.delete("/deleteRaffle/:id_raffle", async (request, response) => {

    const { id_raffle } = request.params;

    // console.log(id_raffle)

    try {

        if (id_raffle) {

            const ids_cat = []

            const ids = await categoryService.listCategory(id_raffle)

            for (const cat of ids) {

                ids_cat.push(cat.id_category)

            }

            for (const id of ids_cat){

                await itemService.deleteItemFromCategory(id)

                await categoryService.deleteCategory(id)

            }

            await raffleService.deleteRaffle(id_raffle)

        }


        // return response.status(200).send({ message: id_raffle })

    } catch (err) {

        return response.status(500).send({ message: err })

    }

})

export default route;