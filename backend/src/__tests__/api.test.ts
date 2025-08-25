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

describe('Casino Content Data', () => {
  test('should have valid casino games data structure', () => {
    expect(casinoContent.casinoGames).toBeDefined();
    expect(Array.isArray(casinoContent.casinoGames)).toBe(true);
    expect(casinoContent.casinoGames.length).toBeGreaterThan(0);
  });

  test('should have valid promotions data structure', () => {
    expect(casinoContent.promotions).toBeDefined();
    expect(Array.isArray(casinoContent.promotions)).toBe(true);
    expect(casinoContent.promotions.length).toBeGreaterThan(0);
  });

  test('should have valid news data structure', () => {
    expect(casinoContent.casinoNews).toBeDefined();
    expect(Array.isArray(casinoContent.casinoNews)).toBe(true);
    expect(casinoContent.casinoNews.length).toBeGreaterThan(0);
  });

  test('each casino game should have required properties', () => {
    casinoContent.casinoGames.forEach((game, index) => {
      expect(game.id).toBeDefined();
      expect(typeof game.id).toBe('string');
      expect(game.title).toBeDefined();
      expect(typeof game.title).toBe('string');
      expect(game.provider).toBeDefined();
      expect(typeof game.provider).toBe('string');
      expect(game.categories).toBeDefined();
      expect(Array.isArray(game.categories)).toBe(true);
      expect(game.imageUrl).toBeDefined();
      expect(typeof game.imageUrl).toBe('string');
      expect(game.description).toBeDefined();
      expect(typeof game.description).toBe('string');
      expect(game.rtp).toBeDefined();
      expect(typeof game.rtp).toBe('number');
      expect(game.volatility).toBeDefined();
      expect(['Low', 'Medium', 'High', 'Medium-Low', 'Medium-High']).toContain(game.volatility);
    });
  });

  test('each promotion should have required properties', () => {
    casinoContent.promotions.forEach((promo, index) => {
      expect(promo.id).toBeDefined();
      expect(typeof promo.id).toBe('string');
      expect(promo.title).toBeDefined();
      expect(typeof promo.title).toBe('string');
      expect(promo.snippet).toBeDefined();
      expect(typeof promo.snippet).toBe('string');
      expect(promo.fullTerms).toBeDefined();
      expect(typeof promo.fullTerms).toBe('string');
      expect(promo.imageUrl).toBeDefined();
      expect(typeof promo.imageUrl).toBe('string');
      expect(promo.expiryDate).toBeDefined();
      expect(typeof promo.expiryDate).toBe('string');
    });
  });

  test('each news item should have required properties', () => {
    casinoContent.casinoNews.forEach((news, index) => {
      expect(news.id).toBeDefined();
      expect(typeof news.id).toBe('string');
      expect(news.title).toBeDefined();
      expect(typeof news.title).toBe('string');
      expect(news.snippet).toBeDefined();
      expect(typeof news.snippet).toBe('string');
      expect(news.fullContent).toBeDefined();
      expect(typeof news.fullContent).toBe('string');
      expect(news.date).toBeDefined();
      expect(typeof news.date).toBe('string');
      expect(news.tags).toBeDefined();
      expect(Array.isArray(news.tags)).toBe(true);
    });
  });
});

describe('Game Finding Logic', () => {
  test('should find game by valid ID', () => {
    const validGameId = casinoContent.casinoGames[0].id;
    const foundGame = casinoContent.casinoGames.find(g => g.id === validGameId);
    
    expect(foundGame).toBeDefined();
    expect(foundGame?.id).toBe(validGameId);
  });

  test('should return undefined for invalid game ID', () => {
    const invalidGameId = 'non-existent-game-id';
    const foundGame = casinoContent.casinoGames.find(g => g.id === invalidGameId);
    
    expect(foundGame).toBeUndefined();
  });

  test('should find games by category', () => {
    const category = 'slots';
    const gamesInCategory = casinoContent.casinoGames.filter(g => 
      g.categories.includes(category)
    );
    
    expect(gamesInCategory.length).toBeGreaterThan(0);
    gamesInCategory.forEach(game => {
      expect(game.categories).toContain(category);
    });
  });

  test('should find popular games', () => {
    const popularGames = casinoContent.casinoGames.filter(g => g.isPopular);
    
    expect(popularGames.length).toBeGreaterThan(0);
    popularGames.forEach(game => {
      expect(game.isPopular).toBe(true);
    });
  });

  test('should find new games', () => {
    const newGames = casinoContent.casinoGames.filter(g => g.isNew);
    
    expect(newGames.length).toBeGreaterThan(0);
    newGames.forEach(game => {
      expect(game.isNew).toBe(true);
    });
  });
});

describe('Data Validation', () => {
  test('all game IDs should be unique', () => {
    const gameIds = casinoContent.casinoGames.map(g => g.id);
    const uniqueIds = new Set(gameIds);
    
    expect(uniqueIds.size).toBe(gameIds.length);
  });

  test('all promotion IDs should be unique', () => {
    const promoIds = casinoContent.promotions.map(p => p.id);
    const uniqueIds = new Set(promoIds);
    
    expect(uniqueIds.size).toBe(promoIds.length);
  });

  test('all news IDs should be unique', () => {
    const newsIds = casinoContent.casinoNews.map(n => n.id);
    const uniqueIds = new Set(newsIds);
    
    expect(uniqueIds.size).toBe(newsIds.length);
  });

  test('game RTP values should be within valid range', () => {
    casinoContent.casinoGames.forEach(game => {
      expect(game.rtp).toBeGreaterThan(0);
      expect(game.rtp).toBeLessThanOrEqual(100);
    });
  });

  test('expiry dates should be valid ISO date strings', () => {
    casinoContent.promotions.forEach(promo => {
      const date = new Date(promo.expiryDate);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });

  test('news dates should be valid ISO date strings', () => {
    casinoContent.casinoNews.forEach(news => {
      const date = new Date(news.date);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
});

describe('Error Handling Scenarios', () => {
  test('should handle missing game gracefully', () => {
    const nonExistentId = 'game_does_not_exist';
    const game = casinoContent.casinoGames.find(g => g.id === nonExistentId);
    
    expect(game).toBeUndefined();
  });

  test('should handle empty categories array', () => {
    const gamesWithCategories = casinoContent.casinoGames.filter(g => 
      g.categories && g.categories.length > 0
    );
    
    expect(gamesWithCategories.length).toBe(casinoContent.casinoGames.length);
  });

  test('should handle optional properties correctly', () => {
    casinoContent.casinoGames.forEach(game => {
      if (game.isNew !== undefined) {
        expect(typeof game.isNew).toBe('boolean');
      }
      if (game.isPopular !== undefined) {
        expect(typeof game.isPopular).toBe('boolean');
      }
    });
  });
});

describe('Data Consistency', () => {
  test('all games should have at least one category', () => {
    casinoContent.casinoGames.forEach(game => {
      expect(game.categories.length).toBeGreaterThan(0);
    });
  });

  test('all promotions should have non-empty content', () => {
    casinoContent.promotions.forEach(promo => {
      expect(promo.title.trim().length).toBeGreaterThan(0);
      expect(promo.snippet.trim().length).toBeGreaterThan(0);
      expect(promo.fullTerms.trim().length).toBeGreaterThan(0);
    });
  });

  test('all news should have non-empty content', () => {
    casinoContent.casinoNews.forEach(news => {
      expect(news.title.trim().length).toBeGreaterThan(0);
      expect(news.snippet.trim().length).toBeGreaterThan(0);
      expect(news.fullContent.trim().length).toBeGreaterThan(0);
    });
  });

  test('image URLs should be valid strings for games and promotions', () => {
    const itemsWithImages = [
      ...casinoContent.casinoGames,
      ...casinoContent.promotions
    ];
    
    itemsWithImages.forEach(item => {
      expect(item.imageUrl).toBeDefined();
      expect(typeof item.imageUrl).toBe('string');
      expect(item.imageUrl.trim().length).toBeGreaterThan(0);
    });
  });
});
