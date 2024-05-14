## Building Fast & Safe Experimentation with Vercel & Optimizely

This is a [Next.js](https://nextjs.org/) project that demonstrates how teams can incorporate feature flags and experimentation into their development workflow. This project uses a simple ecommerce website as an example.

This project features:

- Next.js 14
- App Router
- React Server Components (RSC) and Suspense
- Server Actions
- Edge Middleware
- Styling with Tailwind CSS
- The Vercel Toolbar
- Vercel Middleware Flags
- Vercel Server Flags
- Experimentation with Optimizely

This sample ecommerce website includes many features for developers to get started quickly with experimentation. This includes

- Homepage with product listing
- Product detail page
- Checkout page
- Middleware flags with homepage promotion banner example
- `addToCart` and `placeOrder` Server Actions that track `add_to_cart` and `product_purchase` Optimizely events

### Getting started

Sign up for a free [Optimizely Feature Flags account](https://www.optimizely.com/enhancements/free-feature-flagging) and create a new project.

The following environment variables are required for running this project. Optimizely environment variables values can be retrieved from app.optRetrieve and set the following values from [app.optimizely.com](https://app.optimizely.com/):

- `OPTIMIZELY_API_KEY`
- `OPTIMIZELY_SDK_KEY`
- `OPTIMIZELY_PROJECT_ID`
- `FLAGS_SECRET`
  Create a secret by executing:
  `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`

Run the development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Creating a user context and deciding a feature with the Optimizely JavaScript SDK

The following code snippet demonstrates how to create a user context and then execute `context.decide` to determine whether a feature should be enabled and what variation should be shown.

```typescript
const client = optimizely.createInstance({
  sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
});

if (!client) {
  throw new Error("Failed to create client");
}

await client.onReady();

const context = client.createUserContext("user-1");

if (!context) {
  throw new Error("Failed to create user context");
}

const decision = context.decide("buynow");
```

### Learn More

Take a look at the following resources to learn more:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [The Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar)
- [Feature Flags with Vercel](https://vercel.com/docs/workflow-collaboration/feature-flags)
- [Optimizely Experimentation](https://www.optimizely.com/products/feature-experimentation/)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
