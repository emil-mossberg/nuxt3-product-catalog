# Lantmannen Product Catalog

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```


Deploy project to firebase:

```bash
npm run firebasedeploy
```


## Work with Docker

Build docker image:

```bash
docker build -t dockerImageName .
```

Create and start docker container:

```bash
docker run -p 3000:3000 dockerImageName
```

## Maintenance 

Upgrade Nuxt3 last version

```bash
npx nuxi upgrade
```


## Working with data 

Using JSON file to work with PLP, category Menu and PDP indirectly, since id can from PLP link. This JSON files are now statically added in project, but should be fetched from Magento via API. The files are now built with python scripts in /data_scripts


### categoryProductMapping.sjon

```json
{ 'name': Name of Product, 'id', Id of product: 'products': Array with product ids, breadcrumbs: Array on format {name: name of parent category, url: url of parent category}  }
```

This JSON is used on category page to use ids to fetch products from Klevu


### categoryTree.sjon

```json
{ 'name': Name of Product, 'id': Id of product,  'slug_name' : slug name of product according to format,  'children': Array children categories in same format and grand children etc .. }
```

This JSON is used to build category menu located in header. slug_name is a mapping based on name from Klevu using function here
/nuxt3-agri-demo/composables/useSlug.ts


## Data fetching

PLP - Done SSR on initial load, if click 'load more' then it is client side
PDP - Done SSR
All search functionality - DONE client


## Service worker strategy

App uses workbox-build it precaches css, js and html by default 
