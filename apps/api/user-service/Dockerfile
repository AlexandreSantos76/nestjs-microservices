FROM node:20

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

CMD ["tail", "-f", "/dev/null"]
CMD ["pnpm", "dev"]