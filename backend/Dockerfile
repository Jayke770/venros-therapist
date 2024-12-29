FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production
COPY . .
COPY tsconfig.json .
ENV NODE_ENV production
CMD ["bun", "start-cluster"]