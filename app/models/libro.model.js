module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING
        },
        editorial: {
            type: Sequelize.STRING,
            allowNull: false
        },
        autor: {
            type: Sequelize.STRING
        },
        genero: {
            type: Sequelize.STRING
        },
        pais_autor: {
            type: Sequelize.STRING
        },
        numero_paginas: {
            type: Sequelize.STRING
        },
        anio_edicion: {
            type: Sequelize.DATE
        },
        precio_edicion: {
            type: Sequelize.FLOAT
        },
        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Libro;
};