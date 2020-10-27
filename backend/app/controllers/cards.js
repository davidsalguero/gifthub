const db = require("../models");
const axios = require('axios');
const CardsValueTasaCambio = db.cardsValueTasaCambio;

exports.Card = CardsValueTasaCambio;
exports.axios = axios;

// Actualiiza las giftcards en la base de datos
exports.actualizar = (req, res) => {
    CardsValueTasaCambio.deleteMany({}, () => { });

    axios.get('https://my-json-server.typicode.com/CoffeePaw/AyD1API/db')
        .then(resp => {
            CardsValueTasaCambio.insertMany(resp.data)
                .then(() => { })
            return res
                .status(200)
                .send({ message: "giftcards actualizadas" });
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: `Error al actualizar las giftcards` });
        });
};

function obtenerDatos(res){
    return CardsValueTasaCambio.find({})
        .then((data) => {
            return res
                .status(200)
                .send({ message: "Se devolvieron las giftcards.", cards: data[0] || [] });
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: `Error de la base de datos al devolver las giftcards.` });
        });
}
exports.obtenerDatos = obtenerDatos;

// Obtener todas las giftcards
exports.getAll = (req, res) => {
    obtenerDatos(res)
};