# 🚀 Modal Demo Project

This project demonstrates a modal implementation using [Next.js](https://nextjs.org/) and [Ant Design](https://ant.design/). 

**You can view the deployed version [here](https://modal-demo-mu.vercel.app/).**

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the required dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

This project has several great features that make it stand out:

1. 🦴 **Loading Skeleton**: When the modal data is being fetched, a loading skeleton is displayed to provide a better user experience.
2. 📣 **Notification Messages**: After clicking buttons in the modal, users will receive informative notification messages.
3. 🧩 **Highly Abstract & Decoupled Components**: The project's components are designed to be highly abstract and decoupled, making them easier to maintain and extend.
4. 🔌 **Dynamic Data Fetching**: Users can input an ID in the input box, and the project will fetch the corresponding data from the API, providing a more interactive and flexible user experience. 
5. 📱 **Responsive Design**: The project supports responsive design, ensuring an optimal user experience on both desktop and mobile devices.

Explore the project and experience these features for yourself! 😄

## Design

This project utilizes [Ant Design](https://ant.design/) for UI components and design.

The main file structure is as follows:

```text
├── components
│   ├── common
│   │   ├── block-button.tsx
│   │   ├── money.tsx
│   │   ├── round-container.tsx
│   │   └── statistic-row.tsx
│   └── order-modal
│       ├── index.tsx
│       ├── left-part.tsx
│       └── right-part.tsx
├── pages
│   └── index.tsx
├── styles
│   └── colors.ts
└── utils
    └── common.ts
```



