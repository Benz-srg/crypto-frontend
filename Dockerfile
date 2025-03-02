FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080

CMD ["yarn", "start"]
