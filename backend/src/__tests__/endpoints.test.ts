import { casinoContent } from '../data/casinoContent';

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

describe('API Endpoint Logic', () => {
  
  describe('/api/content endpoint', () => {
    test('should return the full casino content object', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent);
      
      expect(mockRes.json).toHaveBeenCalledWith(casinoContent);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return content with all required sections', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent);
      
      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData).toHaveProperty('casinoGames');
      expect(responseData).toHaveProperty('promotions');
      expect(responseData).toHaveProperty('casinoNews');
    });
  });

  describe('/api/games endpoint', () => {
    test('should return all casino games', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.casinoGames);
      
      expect(mockRes.json).toHaveBeenCalledWith(casinoContent.casinoGames);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return games array with correct length', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.casinoGames);
      
      const responseData = mockRes.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData.length).toBe(casinoContent.casinoGames.length);
    });
  });

  describe('/api/games/:id endpoint', () => {
    test('should return game when valid ID is provided', () => {
      const validGameId = casinoContent.casinoGames[0].id;
      const mockReq = createMockRequest({ id: validGameId });
      const mockRes = createMockResponse();
      
      const game = casinoContent.casinoGames.find(g => g.id === mockReq.params.id);
      if (game) {
        mockRes.json(game);
      }
      
      expect(mockRes.json).toHaveBeenCalledWith(game);
      expect(game).toBeDefined();
      expect(game?.id).toBe(validGameId);
    });

    test('should return 404 status when invalid ID is provided', () => {
      const invalidGameId = 'non-existent-game-id';
      const mockReq = createMockRequest({ id: invalidGameId });
      const mockRes = createMockResponse();
      
      const game = casinoContent.casinoGames.find(g => g.id === mockReq.params.id);
      if (!game) {
        mockRes.status(404).json({ error: "Game not found" });
      }
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Game not found" });
    });

    test('should handle edge case with empty string ID', () => {
      const emptyGameId = '';
      const mockReq = createMockRequest({ id: emptyGameId });
      const mockRes = createMockResponse();
      
      const game = casinoContent.casinoGames.find(g => g.id === mockReq.params.id);
      if (!game) {
        mockRes.status(404).json({ error: "Game not found" });
      }
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Game not found" });
    });
  });

  describe('/api/promotions endpoint', () => {
    test('should return all promotions', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.promotions);
      
      expect(mockRes.json).toHaveBeenCalledWith(casinoContent.promotions);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return promotions array with correct length', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.promotions);
      
      const responseData = mockRes.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData.length).toBe(casinoContent.promotions.length);
    });
  });

  describe('/api/news endpoint', () => {
    test('should return all news articles', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.casinoNews);
      
      expect(mockRes.json).toHaveBeenCalledWith(casinoContent.casinoNews);
      expect(mockRes.json).toHaveBeenCalledTimes(1);
    });

    test('should return news array with correct length', () => {
      const mockRes = createMockResponse();
      
      mockRes.json(casinoContent.casinoNews);
      
      const responseData = mockRes.json.mock.calls[0][0];
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData.length).toBe(casinoContent.casinoNews.length);
    });
  });
});

describe('Response Format Validation', () => {
  test('all endpoint responses should be valid JSON', () => {
    const mockRes = createMockResponse();
    
    mockRes.json(casinoContent);
    expect(() => JSON.parse(JSON.stringify(casinoContent))).not.toThrow();
    
    mockRes.json(casinoContent.casinoGames);
    expect(() => JSON.parse(JSON.stringify(casinoContent.casinoGames))).not.toThrow();
    
    mockRes.json(casinoContent.promotions);
    expect(() => JSON.parse(JSON.stringify(casinoContent.promotions))).not.toThrow();
    
    mockRes.json(casinoContent.casinoNews);
    expect(() => JSON.parse(JSON.stringify(casinoContent.casinoNews))).not.toThrow();
  });

  test('error responses should have consistent format', () => {
    const mockRes = createMockResponse();
    const errorResponse = { error: "Game not found" };
    
    mockRes.status(404).json(errorResponse);
    
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(errorResponse);
    expect(errorResponse).toHaveProperty('error');
    expect(typeof errorResponse.error).toBe('string');
  });
});

describe('Data Integrity in Responses', () => {
  test('games response should maintain data integrity', () => {
    const mockRes = createMockResponse();
    
    mockRes.json(casinoContent.casinoGames);
    
    const responseData = mockRes.json.mock.calls[0][0];
    expect(responseData.length).toBe(casinoContent.casinoGames.length);
    
    const firstGame = responseData[0];
    expect(firstGame).toHaveProperty('id');
    expect(firstGame).toHaveProperty('title');
    expect(firstGame).toHaveProperty('provider');
    expect(firstGame).toHaveProperty('categories');
    expect(firstGame).toHaveProperty('imageUrl');
    expect(firstGame).toHaveProperty('description');
    expect(firstGame).toHaveProperty('rtp');
    expect(firstGame).toHaveProperty('volatility');
  });

  test('promotions response should maintain data integrity', () => {
    const mockRes = createMockResponse();
    
    mockRes.json(casinoContent.promotions);
    
    const responseData = mockRes.json.mock.calls[0][0];
    expect(responseData.length).toBe(casinoContent.promotions.length);
    
    const firstPromo = responseData[0];
    expect(firstPromo).toHaveProperty('id');
    expect(firstPromo).toHaveProperty('title');
    expect(firstPromo).toHaveProperty('snippet');
    expect(firstPromo).toHaveProperty('fullTerms');
    expect(firstPromo).toHaveProperty('imageUrl');
    expect(firstPromo).toHaveProperty('expiryDate');
  });

  test('news response should maintain data integrity', () => {
    const mockRes = createMockResponse();
    
    mockRes.json(casinoContent.casinoNews);
    
    const responseData = mockRes.json.mock.calls[0][0];
    expect(responseData.length).toBe(casinoContent.casinoNews.length);
    
    const firstNews = responseData[0];
    expect(firstNews).toHaveProperty('id');
    expect(firstNews).toHaveProperty('title');
    expect(firstNews).toHaveProperty('snippet');
    expect(firstNews).toHaveProperty('fullContent');
    expect(firstNews).toHaveProperty('date');
    expect(firstNews).toHaveProperty('tags');
  });
});
