FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production
COPY . .
COPY tsconfig.json .
ENV NODE_ENV production
EXPOSE 3000
CMD ["bun", "start-cluster"]