#!/bin/bash

# Pedir nombre
read -p "Nombre del módulo (singular, ej: User): " NAME

# Pasar a minúsculas y plural para las rutas si lo deseas
LOWER_NAME=$(echo "$NAME" | tr '[:upper:]' '[:lower:]')
PLURAL_NAME="${LOWER_NAME}s"
CAP_NAME=$(echo "$LOWER_NAME" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

# Paths
BASE_DIR="modules/$LOWER_NAME"
CONTROLLERS_DIR="$BASE_DIR/controllers"
MODELS_DIR="$BASE_DIR/models"
ROUTES_DIR="$BASE_DIR/routes"
INTERFACES_DIR="$BASE_DIR/interfaces"

# Crear carpetas
mkdir -p "$CONTROLLERS_DIR" "$MODELS_DIR" "$ROUTES_DIR" "$INTERFACES_DIR"

# Crear Controller
cat <<EOL > "$CONTROLLERS_DIR/$LOWER_NAME.controller.ts"
import { Request, Response } from "express";
import $CAP_NAME from "../models/$LOWER_NAME.models";

export const get${CAP_NAME}s = async (req: Request, res: Response) => {
    try {
        const data = await $CAP_NAME.findAll();
        res.json({ ok: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: 'Error' });
    }
};
EOL

# Crear Interface
INTERFACE_FILE="$INTERFACES_DIR/I${CAP_NAME}.interfaces.ts"
INTERFACENAME="I$CAP_NAME"

cat <<EOL > "$INTERFACE_FILE"
export interface $INTERFACENAME {
  id: string;
  // AGREGAR MAS CAMPOS
}
EOL

# Crear Model
cat <<EOL > "$MODELS_DIR/$LOWER_NAME.models.ts"
import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../../../models/database/dbConnection";
import { I$CAP_NAME } from "../interfaces/I${CAP_NAME}.interfaces";

export interface I${CAP_NAME}CreationAttributes extends Optional<I$CAP_NAME, "id"> {}

const $CAP_NAME = db.define<Model<I$CAP_NAME, I${CAP_NAME}CreationAttributes>>('$LOWER_NAME', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Agrega tus campos aquí
}, {
  tableName: '${PLURAL_NAME}',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default $CAP_NAME;
EOL

# Crear Route
cat <<EOL > "$ROUTES_DIR/$LOWER_NAME.route.ts"
import { Router } from "express";
import { get${CAP_NAME}s } from "../controllers/$LOWER_NAME.controller";

const router = Router();

router.get('/', get${CAP_NAME}s);

export default router;
EOL

echo " Módulo $NAME creado en $BASE_DIR"
