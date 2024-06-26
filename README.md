## Building Fast & Safe Experimentation with Vercel & Optimizely

This is a [Next.js](https://nextjs.org/) project that demonstrates how teams can incorporate feature flags and experimentation into their development workflow. This project uses a simple ecommerce website as an example.

This project uses:

- Next.js 14
- App Router
- RSC (React Server Components) and Suspense
- Server Actions
- Edge Middleware
- Tailwind CSS & shadcn/ui
- The Vercel Toolbar
- Middleware and server flags
- Experimentation with Optimizely

## Getting started

Sign up for a free [Optimizely Feature Flags account](https://www.optimizely.com/enhancements/free-feature-flagging) and create a new project.

The following environment variables are required for running this project. Optimizely environment variables values can be retrieved from [app.optimizely.com](https://app.optimizely.com/):

- `OPTIMIZELY_API_KEY`
- `OPTIMIZELY_SDK_KEY`
- `OPTIMIZELY_PROJECT_ID`
- `FLAGS_SECRET`
  Create via: `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`

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

## Important files and folders

| File(s)                                  | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| `/app/[code]/page.tsx`                   | Static homepage with dynamic segment for multiple variations |
| `/app/product/[slug]/page.tsx`           | Product detail page                                          |
| `/app/cart/page.tsx`                     | Cart page                                                    |
| `/app/.well-known/vercel/flags/route.ts` | API route exposing middleware and server flags to toolbar    |
| `/lib/actions.ts`                        | File containing server actions (e.g. track purchase event)   |
| `/lib/middleware-flags.ts`               | Contains declared middleware flags, evaluated in middleware  |
| `/lib/server-flags.ts`                   | Contains declared server flags, evaluated in RSCs            |
| `/middleware.ts`                         | Evaluates middleware flags, set new shopper cookie           |
| `/lib/products.ts`                       | A hardcoded set of products                                  |

## Deciding a feature with the Optimizely JavaScript SDK

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

## Integrating feature flags with the Vercel Toolbar

The Vercel Toolbar is a tool that assists in the iteration and development process. Through the toolbar, you can leave feedback on deployments with Comments, navigate through important dashboard pages, share deployments, utilize Draft Mode for previewing unpublished content, and Visual Editing for editing content in real-time.

1. Add a `FLAGS_SECRET` environment variable to your project.
   This must be defined in the environment variables of your Vercel project.
   The value should be a base64url-encoded string of 32 random bytes. You can generate this value by running the command: `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"`.
2. Expose the flags to the toolbar via an API route.
   This route should be defined in the `.well-known/vercel/flags` directory. The route should return an object with the flags that you want to expose to the toolbar.
   This project returns an object with middleware and server flags:

   ```ts
   export async function GET(request: NextRequest) {
     const access = await verifyAccess(request.headers.get("Authorization"));
     if (!access) return NextResponse.json(null, { status: 401 });

     const middlewareFlags = unstable_getMiddlewareFlagsProviderData(
       middlewareDefinitions
     );
     const serverFlags = unstable_getServerFlagsProviderData(serverDefinitions);

     return NextResponse.json<ApiData>({
       definitions: {
         ...middlewareFlags.definitions,
         ...serverFlags.definitions,
       },
       hints: [...middlewareFlags.hints, ...serverFlags.hints],
     });
   }
   ```

3. Tell the toolbar the value of your server flags by including the `<FlagValues />` component when using a server flag.

   ```tsx
   // Server Flag, imported from lib/server-flags.ts
    const showGetStarted = await showGetStartedFlag();
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Optional: Tells the toolbar about the values of your flags */}
          <FlagValues values={{ [showGetStartedFlag.key]: showGetStarted }} />

          {showGetStarted ? (
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Get started by editing&nbsp;
              <code className="font-mono font-bold">app/page.tsx</code>
            </p>
          ) : null}
    ...
   ```

Refer to the [Vercel Toolbar documentation](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) for more information on configuring and including the Vercel Toolbar in your application.

## Learn More

Take a look at the following resources to learn more:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [The Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar)
- [Feature Flags with Vercel](https://vercel.com/docs/workflow-collaboration/feature-flags)
- [Using Middleware with Feature Flags](https://vercel.com/docs/workflow-collaboration/feature-flags/programming-model-middleware)
- [Creating Server-side Feature Flags](https://vercel.com/docs/workflow-collaboration/feature-flags/programming-model-server)
- [Optimizely Experimentation](https://www.optimizely.com/products/feature-experimentation/)
