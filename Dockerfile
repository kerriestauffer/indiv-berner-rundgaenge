# We label the images in order to easily clear them after.
# clear images with `docker image prune --filter label=stage=build`.
# to look which ones are there: `docker image ls --filter label=stage=build`.

# We may not use the alpine image since it uses musl but our production image may need another c standard lib.
FROM node:19 as build
LABEL stage=build

COPY backend/ /build/backend
COPY frontend /build/frontend

WORKDIR /build/backend

RUN npm install && npm run build

WORKDIR /build/frontend

RUN npm install && npm run build

FROM node:19 as prod

COPY --from=build /build/backend/build /app/dist

COPY --from=build /build/backend/node_modules/ /app/dist/node_modules

COPY --from=build /build/frontend/client /app/client

WORKDIR /app/dist/

CMD ["node", "main.js"]