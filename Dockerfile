FROM node:lts
WORKDIR /app
COPY . .
RUN npm i
RUN npx astro telemetry disable
EXPOSE 4321
CMD ["npx", "astro", "dev", "--host"]