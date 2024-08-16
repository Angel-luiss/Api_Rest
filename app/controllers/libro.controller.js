const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        // Construir el objeto Libro desde el cuerpo de la solicitud
        libro.codigo = req.body.codigo;
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais_autor = req.body.pais_autor;
        libro.numero_paginas = req.body.numero_paginas;
        libro.anio_edicion = req.body.anio_edicion;
        libro.precio_edicion = req.body.precio_edicion;

        // Guardar en la base de datos
        Libro.create(libro).then(result => {    
            // Enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Upload Successfully a Libro with id = " + result.id,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllLibros = (req, res) => {
    // Encontrar toda la información de los libros
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Get all Libros' Infos Successfully!",
                libros: libroInfos
            });
        })
        .catch(error => {
            // Log en consola
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getLibroById = (req, res) => {
    // Encontrar la información del libro por ID
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Successfully Get a Libro with id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            // Log en consola
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            // Retornar respuesta al cliente
            res.status(404).json({
                message: "Not Found for updating a Libro with id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            // Actualizar nuevos cambios en la base de datos
            let updatedObject = {
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_paginas: req.body.numero_paginas,
                anio_edicion: req.body.anio_edicion,
                precio_edicion: req.body.precio_edicion
            }
            let result = await Libro.update(updatedObject, { returning: true, where: { id: libroId } });
            
            // Retornar la respuesta al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Libro with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Libro with id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Libro with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Does Not exist a Libro with id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a Libro with id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Libro with id = " + req.params.id,
            error: error.message,
        });
    }
}
