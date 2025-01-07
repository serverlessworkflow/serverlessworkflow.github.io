# Serverless Workflow Website Repository

This repository hosts the website for the [Serveless Workflow Specification](https://github.com/serverlessworkflow/specification) project at [https://serverlessworkflow.io](https://serverlessworkflow.io).

## 🧑 Contributing to the website

The website uses [Astro](https://astro.build/). You can find more information about how to get started with this stack [here](https://docs.astro.build/en/getting-started/).

For the styling, it relies on [TailWind CSS](https://tailwindcss.com/) and [Daisy UI](https://daisyui.com/).

To contribute to the website you don't need to have in-deth web design knowledge:
- To publish a blog post just add a new Markdown page to the [`blog`](src/content/blog) directory. You can always use the blog posts in this repository as a reference. 
- For more complex changes to the website, have a look at the [Astro Docs](https://docs.astro.build/en/getting-started/)

## 🚀 Project Structure

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


Alternatively, you can use Docker to run the project and connect on `localhost:4321`: 
```
docker compose up --remove-orphans --watch
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
