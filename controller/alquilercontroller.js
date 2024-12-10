const { Alquiler, Cliente, Autos } = require('../models');

exports.realizarAlquiler = async (req, res) => {
    const { clienteId, autoId, fechaInicio, fechaFin } = req.body;
    try {
        const auto = await Autos.findByPk(autoId);
        if (auto && auto.disponibilidad === 1) {
            const cliente = await Cliente.findByPk(clienteId);
            if (!cliente) {
                return res.json({ mensaje: "El cliente no existe" });
            }

            const alquiler = await Alquiler.create({
                clienteId,
                autoId,
                fechaInicio,
                fechaFin
            });

            await auto.update({ disponibilidad: 0 });

            res.json(alquiler);
        } else {
            res.json({ mensaje: "El auto no está disponible o no existe" });
        }
    } catch (e) {
        console.error(e); // Para ver el error en la consola
        res.json({ mensaje: "Error al registrar el alquiler", error: e.message });
    }
};



exports.historial = async (req, res) => {
    try {
        const alquileres = await Alquiler.findAll({
            include: [
                { model: Cliente,
                  as: 'clientes',
                  attributes: ['nombre', 'correo', 'numLic'] },
                { model: Autos,
                  as: 'autos', 
                  attributes: ['marca', 'modelo', 'imagen', 'valorAlquiler', 'anio'] } 
            ]
        });
        res.json(alquileres);
    } catch (e) {
        console.error(e); 
        res.json({ mensaje: "Error al obtener el historial de alquileres",error: e.message});
    }
};
