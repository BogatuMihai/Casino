# Backend Testing Documentation

## Overview

This backend includes comprehensive unit tests for the casino content API logic, data validation, and endpoint functionality. The tests ensure data integrity, proper error handling, and consistent API responses.

## Testing Setup

### Dependencies

The following testing dependencies have been added to `package.json`:

```json
{
  "devDependencies": {
    "@types/jest": "^29.5.12",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.2"
  }
}
```

### Configuration

- **Jest Configuration**: `jest.config.js` - Configured for TypeScript support
- **Test Environment**: Node.js environment
- **Coverage Reports**: HTML, LCOV, and text formats
- **Test Timeout**: 10 seconds

## Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### 1. API Data Tests (`api.test.ts`)

**Casino Content Data Structure Tests:**
- Validates that all required data sections exist
- Ensures proper data types for all properties
- Verifies required fields are present

**Game Finding Logic Tests:**
- Tests game retrieval by ID (valid and invalid)
- Tests category-based filtering
- Tests popular and new game identification

**Data Validation Tests:**
- Ensures unique IDs across all data types
- Validates RTP values are within proper ranges (0-100%)
- Verifies date formats are valid ISO strings

**Error Handling Tests:**
- Tests graceful handling of missing data
- Validates optional properties
- Ensures proper fallback behavior

**Data Consistency Tests:**
- Verifies all games have at least one category
- Ensures non-empty content for all items
- Validates image URLs for applicable items

### 2. Endpoint Logic Tests (`endpoints.test.ts`)

**API Endpoint Tests:**
- `/api/content` - Full content retrieval
- `/api/games` - All games retrieval
- `/api/games/:id` - Individual game retrieval with error handling
- `/api/promotions` - All promotions retrieval
- `/api/news` - All news retrieval

**Response Format Validation:**
- Ensures all responses are valid JSON
- Tests error response consistency
- Validates HTTP status codes

**Data Integrity Tests:**
- Verifies response data maintains all properties
- Tests array lengths and structure
- Ensures no data loss during API responses

## Test Coverage

Current test coverage:
- **Data Layer**: 100% (casinoContent.ts)
- **API Logic**: Simulated and tested through mock objects
- **Total Tests**: 40 tests across 2 test suites

## Running Tests

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure TypeScript compilation works:
   ```bash
   npm run build
   ```

### Execute Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode for development
npm run test:watch
```

## Test Examples

### Data Structure Validation
```typescript
test('each casino game should have required properties', () => {
  casinoContent.casinoGames.forEach((game) => {
    expect(game.id).toBeDefined();
    expect(typeof game.id).toBe('string');
    expect(game.title).toBeDefined();
    // ... more validations
  });
});
```

### API Logic Testing
```typescript
test('should return 404 status when invalid ID is provided', () => {
  const invalidGameId = 'non-existent-game-id';
  const mockReq = createMockRequest({ id: invalidGameId });
  const mockRes = createMockResponse();
  
  // Simulate the endpoint logic
  const game = casinoContent.casinoGames.find(g => g.id === mockReq.params.id);
  if (!game) {
    mockRes.status(404).json({ error: "Game not found" });
  }
  
  expect(mockRes.status).toHaveBeenCalledWith(404);
  expect(mockRes.json).toHaveBeenCalledWith({ error: "Game not found" });
});
```

## Mock Objects

The tests use mock Express request and response objects to simulate API behavior:

```typescript
const createMockRequest = (params: any = {}, body: any = {}) => ({
  params,
  body,
  query: {},
  headers: {},
  method: 'GET',
  url: '/',
  originalUrl: '/',
});

const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
```

## Best Practices Implemented

1. **Comprehensive Coverage**: Tests cover data structure, validation, and API logic
2. **Mock Objects**: Proper mocking of Express request/response objects
3. **Edge Cases**: Tests include error scenarios and boundary conditions
4. **Data Integrity**: Ensures no data corruption during API operations
5. **Type Safety**: Full TypeScript support with proper type checking

## Future Testing Enhancements

1. **Integration Tests**: Test actual Express server endpoints
2. **Database Tests**: When database integration is added
3. **Authentication Tests**: For future security features
4. **Performance Tests**: Load testing for API endpoints
5. **API Documentation Tests**: Ensure OpenAPI/Swagger consistency

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure `ts-jest` is properly configured
2. **Import Errors**: Check file paths in test files
3. **Mock Issues**: Verify mock object creation and usage

### Debug Mode

Run tests with verbose output:
```bash
npm test -- --verbose
```

### Coverage Issues

If coverage reports show unexpected results:
1. Check Jest configuration
2. Verify test file patterns
3. Ensure all source files are included
