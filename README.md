# @shim-finance/typescript-sdk

TypeScript SDK for the Shim.Finance REST API.

## Installation

```bash
npm install @shim-finance/typescript-sdk
```

## Usage

```typescript
import { client, institutionsList } from '@shim-finance/typescript-sdk';

// Configure the client
client.setConfig({
  baseUrl: 'https://api.shim.finance',
  headers: {
    Authorization: 'Bearer YOUR_API_KEY',
  },
});

// List institutions
const { data, error } = await institutionsList();

if (error) {
  console.error('Error:', error.message);
} else {
  console.log('Institutions:', data);
}
```

## Custom Client

```typescript
import { createClient, createConfig, institutionsList } from '@shim-finance/typescript-sdk';

const myClient = createClient(
  createConfig({
    baseUrl: 'https://api.shim.finance',
    headers: {
      Authorization: 'Bearer YOUR_API_KEY',
    },
  })
);

const { data } = await institutionsList({ client: myClient });
```

## API Reference

### `institutionsList()`

Returns all connected financial institutions for the authenticated user.

**Response:**
- `200`: `Institution[]` - Array of institutions
- `401`: `Unauthorized` - Missing or invalid authorization
- `500`: `InternalError` - Server error

## License

MIT
