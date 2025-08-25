import { useEffect, useState } from "react";

interface CasinoGame {
  id: string;
  title: string;
  provider: string;
  categories: string[];
  imageUrl: string;
  description: string;
  rtp: number;
  volatility: 'Low' | 'Medium' | 'High' | 'Medium-Low' | 'Medium-High';
  isNew?: boolean;
  isPopular?: boolean;
}

interface Promotion {
  id: string;
  title: string;
  snippet: string;
  fullTerms: string;
  imageUrl: string;
  expiryDate: string;
}

interface CasinoNews {
  id: string;
  title: string;
  snippet: string;
  fullContent: string;
  date: string;
  tags: string[];
}

interface CasinoContent {
  casinoGames: CasinoGame[];
  promotions: Promotion[];
  casinoNews: CasinoNews[];
}

type ContentTab = 'games' | 'promotions' | 'news';

function App() {
  const [casinoData, setCasinoData] = useState<CasinoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ContentTab>('games');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [expandedPromotions, setExpandedPromotions] = useState<Set<string>>(new Set());
  
  const [expandedNews, setExpandedNews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCasinoContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:5000/api/content");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: CasinoContent = await response.json();
        setCasinoData(data);
      } catch (err) {
        console.error("Error fetching casino content:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCasinoContent();
  }, []);

  const getAllCategories = () => {
    if (!casinoData) return [];
    const categories = new Set<string>();
    casinoData.casinoGames.forEach(game => {
      game.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories).sort();
  };

  const getFilteredGames = () => {
    if (!casinoData) return [];
    
    return casinoData.casinoGames.filter(game => {
      const matchesSearch = searchTerm === '' || 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(category => game.categories.includes(category));
      
      return matchesSearch && matchesCategory;
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  const togglePromotionExpansion = (promotionId: string) => {
    setExpandedPromotions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promotionId)) {
        newSet.delete(promotionId);
      } else {
        newSet.add(promotionId);
      }
      return newSet;
    });
  };

  const toggleNewsExpansion = (newsId: string) => {
    setExpandedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  };

  const handleTabChange = (tab: ContentTab) => {
    setActiveTab(tab);
    if (tab !== 'promotions') {
      setExpandedPromotions(new Set());
    }
    if (tab !== 'news') {
      setExpandedNews(new Set());
    }
  };

  const renderGames = () => {
    const filteredGames = getFilteredGames();
    const allCategories = getAllCategories();

    return (
      <div>
        <h2 style={{ 
          marginBottom: "30px", 
          color: "#2c3e50", 
          fontSize: "2rem",
          fontWeight: "600",
          borderBottom: "3px solid #667eea",
          paddingBottom: "10px"
        }}>
          🎮 Casino Games ({filteredGames.length} of {casinoData!.casinoGames.length})
        </h2>

        {/* Search and Filter Section */}
        <div style={{ 
          background: "#f8fafc", 
          padding: "24px", 
          borderRadius: "16px", 
          marginBottom: "30px",
          border: "1px solid #e2e8f0"
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="gameSearch" style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600", 
              color: "#374151",
              fontSize: "14px"
            }}>
              🔍 Search Games
            </label>
            <input
              id="gameSearch"
              type="text"
              placeholder="Search by title, description, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Category Filters */}
          <div>
            <div style={{ 
              marginBottom: "12px", 
              fontWeight: "600", 
              color: "#374151",
              fontSize: "14px"
            }}>
              🏷️ Filter by Category
            </div>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "8px",
              marginBottom: "16px"
            }}>
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: selectedCategories.includes(category) 
                      ? "#667eea" 
                      : "#e5e7eb",
                    color: selectedCategories.includes(category) 
                      ? "white" 
                      : "#374151",
                    fontWeight: selectedCategories.includes(category) 
                      ? "600" 
                      : "500",
                    border: selectedCategories.includes(category) 
                      ? "2px solid #667eea" 
                      : "2px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedCategories.includes(category)) {
                      e.currentTarget.style.background = "#d1d5db";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedCategories.includes(category)) {
                      e.currentTarget.style.background = "#e5e7eb";
                    }
                  }}
                >
                  {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategories.length > 0) && (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                flexWrap: "wrap"
              }}>
                <span style={{ 
                  fontSize: "14px", 
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  Active filters:
                </span>
                {searchTerm && (
                  <span style={{
                    background: "#dbeafe",
                    color: "#1e40af",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedCategories.map(category => (
                  <span key={category} style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "background 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
                >
                  ✕ Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* No Results Message */}
        {filteredGames.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 20px",
            color: "#6b7280"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#374151" }}>No games found</h3>
            <p style={{ margin: "0 0 20px 0" }}>
              Try adjusting your search terms or category filters
            </p>
            <button
              onClick={clearFilters}
              style={{
                background: "#667eea",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Games Grid */}
        {filteredGames.length > 0 && (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
            gap: "25px",
            padding: "10px 0"
          }}>
            {filteredGames.map((game) => (
              <div key={game.id} style={{ 
                background: "white",
                border: "1px solid #e1e8ed",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)";
              }}
              >
                {/* Game Image */}
                <div style={{ 
                  position: "relative", 
                  marginBottom: "16px",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}>
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    style={{ 
                      width: "100%", 
                      height: "200px", 
                      objectFit: "cover",
                      borderRadius: "12px",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  
                  {/* Provider Badge */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backdropFilter: "blur(10px)"
                  }}>
                    {game.provider}
                  </div>

                  {/* RTP Badge */}
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(34, 197, 94, 0.9)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "16px",
                    fontSize: "11px",
                    fontWeight: "600",
                    backdropFilter: "blur(10px)"
                  }}>
                    RTP: {game.rtp}%
                  </div>
                </div>

                {/* Game Info */}
                <div style={{ padding: "0 4px" }}>
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: "1.4rem", 
                    fontWeight: "700",
                    color: "#1a202c",
                    lineHeight: "1.3"
                  }}>
                    {game.title}
                  </h3>
                  
                  <p style={{ 
                    margin: "0 0 16px 0", 
                    color: "#4a5568", 
                    lineHeight: "1.5",
                    fontSize: "0.95rem"
                  }}>
                    {game.description}
                  </p>

                  {/* Game Stats */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "16px",
                    padding: "12px",
                    background: "#f8fafc",
                    borderRadius: "8px"
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ 
                        fontSize: "12px", 
                        color: "#64748b", 
                        fontWeight: "500",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        Volatility
                      </div>
                      <div style={{ 
                        fontSize: "14px", 
                        color: "#1e293b", 
                        fontWeight: "600",
                        marginTop: "4px"
                      }}>
                        {game.volatility}
                      </div>
                    </div>
                    
                    <div style={{ 
                      width: "1px", 
                      height: "30px", 
                      background: "#e2e8f0" 
                    }}></div>
                    
                    <div style={{ textAlign: "center" }}>
                      <div style={{ 
                        fontSize: "12px", 
                        color: "#64748b", 
                        fontWeight: "500",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                      }}>
                        Categories
                      </div>
                      <div style={{ 
                        fontSize: "14px", 
                        color: "#1e293b", 
                        fontWeight: "600",
                        marginTop: "4px"
                      }}>
                        {game.categories.length}
                      </div>
                    </div>
                  </div>

                  {/* Special Badges */}
                  <div style={{ 
                    display: "flex", 
                    gap: "8px", 
                    flexWrap: "wrap"
                  }}>
                    {game.isNew && (
                      <span style={{ 
                        background: "linear-gradient(135deg, #10b981, #059669)", 
                        color: "white", 
                        padding: "6px 12px", 
                        borderRadius: "20px", 
                        fontSize: "12px", 
                        fontWeight: "600",
                        boxShadow: "0 2px 4px rgba(16, 185, 129, 0.3)"
                      }}>
                        ✨ NEW
                      </span>
                    )}
                    {game.isPopular && (
                      <span style={{ 
                        background: "linear-gradient(135deg, #f59e0b, #d97706)", 
                        color: "white", 
                        padding: "6px 12px", 
                        borderRadius: "20px", 
                        fontSize: "12px", 
                        fontWeight: "600",
                        boxShadow: "0 2px 4px rgba(245, 158, 11, 0.3)"
                      }}>
                        🔥 POPULAR
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPromotions = () => (
    <div>
      <h2 style={{ 
        marginBottom: "30px", 
        color: "#2c3e50", 
        fontSize: "2rem",
        fontWeight: "600",
        borderBottom: "3px solid #667eea",
        paddingBottom: "10px"
      }}>
        🎁 Promotions ({casinoData!.promotions.length})
      </h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", 
        gap: "25px",
        padding: "10px 0"
      }}>
        {casinoData!.promotions.map((promo) => {
          const isExpanded = expandedPromotions.has(promo.id);
          
          return (
            <div key={promo.id} style={{ 
              background: "white",
              border: "1px solid #e1e8ed",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)";
            }}
            >
              {/* Promotion Image */}
              <div style={{ 
                position: "relative", 
                marginBottom: "20px",
                borderRadius: "12px",
                overflow: "hidden"
              }}>
                <img 
                  src={promo.imageUrl} 
                  alt={promo.title} 
                  style={{ 
                    width: "100%", 
                    height: "180px", 
                    objectFit: "cover",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                
                {/* Expiry Date Badge */}
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "rgba(239, 68, 68, 0.9)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backdropFilter: "blur(10px)"
                }}>
                  Expires: {new Date(promo.expiryDate).toLocaleDateString()}
                </div>
              </div>

              {/* Promotion Content */}
              <div>
                <h3 style={{ 
                  margin: "0 0 16px 0", 
                  fontSize: "1.5rem", 
                  fontWeight: "700",
                  color: "#1a202c",
                  lineHeight: "1.3"
                }}>
                  {promo.title}
                </h3>
                
                <p style={{ 
                  margin: "0 0 20px 0", 
                  color: "#4a5568", 
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  {promo.snippet}
                </p>

                {/* Full Terms Section */}
                {isExpanded && (
                  <div style={{
                    background: "#f8fafc",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    border: "1px solid #e2e8f0"
                  }}>
                    <h4 style={{
                      margin: "0 0 12px 0",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#374151"
                    }}>
                      📋 Full Terms & Conditions
                    </h4>
                    <p style={{
                      margin: 0,
                      color: "#4a5568",
                      lineHeight: "1.6",
                      fontSize: "0.95rem",
                      whiteSpace: "pre-wrap"
                    }}>
                      {promo.fullTerms}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ 
                  display: "flex", 
                  gap: "12px",
                  alignItems: "center"
                }}>
                  <button
                    onClick={() => togglePromotionExpansion(promo.id)}
                    style={{
                      background: isExpanded ? "#6b7280" : "#667eea",
                      color: "white",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isExpanded ? "#4b5563" : "#5a67d8";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isExpanded ? "#6b7280" : "#667eea";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {isExpanded ? (
                      <>
                        <span>📖</span>
                        Show Less
                      </>
                    ) : (
                      <>
                        <span>📖</span>
                        Read More
                      </>
                    )}
                  </button>
                  
                  <button
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#059669";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#10b981";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>🎯</span>
                    Claim Offer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNews = () => (
    <div>
      <h2 style={{ 
        marginBottom: "30px", 
        color: "#2c3e50", 
        fontSize: "2rem",
        fontWeight: "600",
        borderBottom: "3px solid #667eea",
        paddingBottom: "10px"
      }}>
        📰 Casino News ({casinoData!.casinoNews.length})
      </h2>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))", 
        gap: "25px",
        padding: "10px 0"
      }}>
        {casinoData!.casinoNews.map((news) => {
          const isExpanded = expandedNews.has(news.id);
          
          return (
            <div key={news.id} style={{ 
              background: "white",
              border: "1px solid #e1e8ed",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)";
            }}
            >
              {/* News Header */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "16px"
                }}>
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: "1.4rem", 
                    fontWeight: "700",
                    color: "#1a202c",
                    lineHeight: "1.3",
                    flex: 1,
                    paddingRight: "16px"
                  }}>
                    {news.title}
                  </h3>
                  
                  {/* Date Badge */}
                  <div style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    flexShrink: 0
                  }}>
                    📅 {new Date(news.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <p style={{ 
                  margin: "0 0 16px 0", 
                  color: "#4a5568", 
                  lineHeight: "1.6",
                  fontSize: "1rem"
                }}>
                  {news.snippet}
                </p>

                {/* Tags */}
                <div style={{ 
                  display: "flex", 
                  gap: "8px", 
                  flexWrap: "wrap",
                  marginBottom: "16px"
                }}>
                  {news.tags.map((tag) => (
                    <span key={tag} style={{ 
                      background: "#f3f4f6", 
                      color: "#374151", 
                      padding: "6px 12px", 
                      borderRadius: "16px", 
                      fontSize: "12px", 
                      fontWeight: "500",
                      border: "1px solid #e5e7eb"
                    }}>
                      #{tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Article Content */}
              {isExpanded && (
                <div style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  border: "1px solid #e2e8f0"
                }}>
                  <h4 style={{
                    margin: "0 0 16px 0",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    📖 Full Article
                  </h4>
                  <div style={{
                    color: "#4a5568",
                    lineHeight: "1.7",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap"
                  }}>
                    {news.fullContent}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ 
                display: "flex", 
                gap: "12px",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <button
                  onClick={() => toggleNewsExpansion(news.id)}
                  style={{
                    background: isExpanded ? "#6b7280" : "#667eea",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isExpanded ? "#4b5563" : "#5a67d8";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isExpanded ? "#6b7280" : "#667eea";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {isExpanded ? (
                    <>
                      <span>📖</span>
                      Show Less
                    </>
                  ) : (
                    <>
                      <span>📖</span>
                      Read Article
                    </>
                  )}
                </button>
                
                <div style={{ 
                  display: "flex", 
                  gap: "8px",
                  alignItems: "center"
                }}>
                  <button
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#d97706";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f59e0b";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>🔖</span>
                    Bookmark
                  </button>
                  
                  <button
                    style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#059669";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#10b981";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>📤</span>
                    Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'games':
        return renderGames();
      case 'promotions':
        return renderPromotions();
      case 'news':
        return renderNews();
      default:
        return renderGames();
    }
  };

  if (loading) {
    return (
      <div>
        <header style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "20px", 
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>🎰 Casino Hub</h1>
        </header>
        <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#666" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <header style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "20px", 
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>🎰 Casino Hub</h1>
        </header>
        <div style={{ padding: 20, textAlign: "center" }}>
          <div style={{ color: "red", fontSize: "16px" }}>
            Error: {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!casinoData) {
    return (
      <div>
        <header style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "20px", 
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>🎰 Casino Hub</h1>
        </header>
        <div style={{ padding: 20, textAlign: "center" }}>
          <div>No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "white", 
        padding: "20px", 
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>🎰 Casino Hub</h1>
      </header>

      {/* Navigation */}
      <nav style={{ 
        background: "#f8f9fa", 
        borderBottom: "1px solid #dee2e6",
        padding: "0 20px"
      }}>
        <div style={{ 
          display: "flex", 
          gap: "10px", 
          padding: "15px 0"
        }}>
          <button
            onClick={() => handleTabChange('games')}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeTab === 'games' ? "#667eea" : "#e9ecef",
              color: activeTab === 'games' ? "white" : "#495057",
              fontWeight: activeTab === 'games' ? "600" : "400",
              transition: "all 0.2s ease"
            }}
          >
            🎮 Casino Games ({casinoData.casinoGames.length})
          </button>
          <button
            onClick={() => handleTabChange('promotions')}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeTab === 'promotions' ? "#667eea" : "#e9ecef",
              color: activeTab === 'promotions' ? "white" : "#495057",
              fontWeight: activeTab === 'promotions' ? "600" : "400",
              transition: "all 0.2s ease"
            }}
          >
            🎁 Promotions ({casinoData.promotions.length})
          </button>
          <button
            onClick={() => handleTabChange('news')}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: activeTab === 'news' ? "#667eea" : "#e9ecef",
              color: activeTab === 'news' ? "white" : "#495057",
              fontWeight: activeTab === 'news' ? "600" : "400",
              transition: "all 0.2s ease"
            }}
          >
            📰 News ({casinoData.casinoNews.length})
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: "20px" }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
