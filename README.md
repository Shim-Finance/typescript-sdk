# @shim-finance/typescript-sdk

TypeScript SDK for the [Shim.Finance](https://shim.finance) REST API.

## Installation

```bash
npm install @shim-finance/typescript-sdk
```

## Quick Start

```typescript
import { client, institutionsList, accountsList, transactionsList } from '@shim-finance/typescript-sdk';

// Configure the client with your API key
client.setConfig({
  baseUrl: 'https://api.shim.finance',
  headers: {
    Authorization: 'Bearer sk_live_YOUR_API_KEY',
  },
});

// List connected institutions
const institutions = await institutionsList();

// List all accounts
const accounts = await accountsList();

// List transactions with filtering
const transactions = await transactionsList({
  query: {
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    limit: '50',
  },
});
```

## Custom Client

Use `createClient` if you need multiple clients or custom configuration:

```typescript
import { createClient, createConfig, transactionsSync } from '@shim-finance/typescript-sdk';

const myClient = createClient(
  createConfig({
    baseUrl: 'https://api.shim.finance',
    headers: {
      Authorization: 'Bearer sk_live_YOUR_API_KEY',
    },
  })
);

const { data } = await transactionsSync({ client: myClient });
```

## Error Handling

All SDK functions return `{ data, error }`. Check `error` before using `data`:

```typescript
const { data, error } = await transactionsList();

if (error) {
  console.error('API error:', error);
} else {
  console.log(\`Found \${data.total} transactions\`);
}
```

## API Reference

### `institutionsList()`

Returns all connected financial institutions (banks) for the authenticated user.

### `accountsList()`

Returns all bank accounts across all connected institutions.

### `transactionsList(options?)`

Returns transactions with optional filtering and pagination.

| Parameter | Type | Description |
|-----------|------|-------------|
| `query.accountId` | `string` | Filter by account ID |
| `query.startDate` | `string` | Inclusive start date (YYYY-MM-DD) |
| `query.endDate` | `string` | Inclusive end date (YYYY-MM-DD) |
| `query.limit` | `string` | Max results per page (default 100, max 500) |
| `query.offset` | `string` | Number of results to skip |

### `transactionsSync(options?)`

Incrementally sync transaction changes. Omit `cursor` for initial sync, then pass the returned `cursor` to subsequent calls.

| Parameter | Type | Description |
|-----------|------|-------------|
| `query.cursor` | `string` | Sync cursor from a previous response |

Returns `{ added, modified, removed, cursor, hasMore }`.

## Authentication

All endpoints require an API key. Create one in your [Shim.Finance dashboard](https://app.shim.finance) under Settings > API Keys.

API keys use the format `sk_live_<token>`. Include it as a Bearer token in the Authorization header.

## License

MIT
