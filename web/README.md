# Mode Mobile Web3 ToDo App

Having followed the instructions, I present to you my own version of Web3 ToDos.

This repo:

- Is a NextJS 14+ app with App Router
- The UI libraries include Tailwind CSS and Shadcn
- State management uses advanced implementation of native `useContext` hooks
- Wallet connection is handled by AppKit (former WalletConnect)

## Highlights

I made important decisions to avoid repeating myself. The client app uses the ToDos API as a linked local yarn
dependency to reuse the Typescript types and Zod objects that were already in place.

This app uses the latest version of AppKit (WalletConnect changed its name).

This app uses the "Wagmi React Hooks" way of rendering data from the contracts.

Also, I'm not sure if it was on purpose, but the contract ABIs were incomplete and threw an error when trying to mint or
burn, so I updated the ABI files too. I created a new hardhart project to compile the TestNFT contract and get the full
ABI.

The project uses automatic industry standard linting and formatting. VS Code setting files included.

Web3 Authentication is checked on the server side too.

I tried to use the included Bruno API files, but Bruno is very limited on their plugins such as exporting for OpenAPI or
even creating typings, so I opted out of Bruno.

## Project Setup

Navigate into the `web` directory and run:

```bash
yarn
```

Then, simply update the `.env.example` file with your own WalletConnect AppKit API token and run:

```bash
make up-dev
```

This command should link the local dependencies.

Finally, run:

```bash
yarn dev
```

OR, if you're in VS Code, try running the app with the debugger settings set in `launch.json` by hitting the F5 button
on your keyboard, or running the debugger manually.

At this point, you should see the app in `localhost:3002`.
