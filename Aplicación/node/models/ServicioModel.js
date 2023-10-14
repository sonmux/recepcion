//* Importar la conexión de la db
import db from '../database/db.js'

//* Importar sequelize
import { DataTypes } from "sequelize";

//! en "define" colocamos el nombre de nuestra tabla
//? para sequelize el nombre de las tablas, en la db, deben estar escritas en plural

const ServicioModel = db.define('servicios',{
    servicio: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    precio: {type: DataTypes.INTEGER}, 
})


export default ServicioModel







//*
//!
//?
//!?
//
//todo
/* */

/* 
{
    "workbench.iconTheme": "vscode-icons",
    "security.workspace.trust.untrustedFiles": "open",
    "gopls": {
        "build.experimentalWorkspaceModule": true
    },
    "[python]": {
        "editor.formatOnType": true
    },
    "mdb.defaultLimit": 1000,
    "better-comments.tags": [
    
        {
            "tag": "!?",
            "color": "#FF2D00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false
        },
        {
            "tag": "!",
            "color": "#D7DF01",
            "strikethrough": false,
            "underline": true,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false
        },
        {
            "tag": "?",
            "color": "#01DFD7",
            "strikethrough": false,
            "underline": true,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false
        },
        {
            "tag": "//",
            "color": "#6E6E6E",
            "strikethrough": false,
            "underline": true,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": true
        },
        {
            "tag": "todo",
            "color": "#FF8C00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false
        },
        {
            "tag": "*",
            "color": "#DF7401",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": true,
            "italic": false
        }
    ],
    "better-comments.highlightPlainText": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "files.autoSave": "afterDelay"
}
*/