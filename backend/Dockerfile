FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production
COPY . .
COPY tsconfig.json .
CMD ["bun", "start-cluster"]