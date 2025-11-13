# Dockerfile
FROM node:alpine
# Directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiamos los archivos de configuración y dependencias
COPY package.json .
# Si usas yarn, copia yarn.lock en lugar de package-lock.json
COPY package-lock.json .
# instalamos las dependencias
RUN npm install
# Copiamos el resto de los archivos de la aplicación
COPY . .
# Construimos la aplicación para producción
RUN npm run build
# Exponemos el puerto en el que correrá la aplicación
EXPOSE  3000
# Comando para inciar la apliación en modo producción
CMD ["npm", "start"]
