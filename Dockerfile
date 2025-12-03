# ---- STAGE 1: Build Angular App ----
FROM node:20-alpine AS builder
WORKDIR /frontend


# Dependencies installieren
COPY ./package*.json ./
RUN npm install

# Restlichen Code kopieren
COPY . .

# Angular build (prod)
RUN npm run build -- --configuration production


# ---- STAGE 2: NGINX für statische Dateien ----
# dist/<app-name>/browser/*
FROM nginx:alpine
COPY --from=builder /frontend/dist/*/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
