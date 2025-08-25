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

export interface CasinoContent {
    casinoGames: CasinoGame[];
    promotions: Promotion[];
    casinoNews: CasinoNews[];
}

export const casinoContent: CasinoContent = {
    casinoGames: [
        {
            id: 'game_starburst',
            title: 'Starburst',
            provider: 'NetEnt',
            categories: ['slots', 'popular', 'low-volatility'],
            imageUrl: 'https://picsum.photos/seed/starburst/300/200',
            description: 'A vibrant and cosmic slot game with expanding wilds and re-spins.',
            rtp: 96.09,
            volatility: 'Low',
            isPopular: true,
        },
        {
            id: 'game_bookofdead',
            title: 'Book of Dead',
            provider: 'Play\'n GO',
            categories: ['slots', 'adventure', 'high-volatility'],
            imageUrl: 'https://picsum.photos/seed/bookofdead/300/200',
            description: 'Join Rich Wilde on an adventure to uncover ancient Egyptian treasures.',
            rtp: 96.21,
            volatility: 'High',
            isPopular: true,
        },
        {
            id: 'game_bonanzamegaways',
            title: 'Bonanza Megaways',
            provider: 'Big Time Gaming',
            categories: ['slots', 'megaways', 'high-volatility'],
            imageUrl: 'https://picsum.photos/seed/bonanza/300/200',
            description: 'Experience cascading reels and up to 117,649 ways to win.',
            rtp: 96.00,
            volatility: 'High',
        },
        {
            id: 'game_lightningroulette',
            title: 'Lightning Roulette',
            provider: 'Evolution Gaming',
            categories: ['live-casino', 'roulette', 'popular'],
            imageUrl: 'https://picsum.photos/seed/lightningroulette/300/200',
            description: 'Live Roulette with electrifying multipliers on straight up bets.',
            rtp: 97.30,
            volatility: 'Medium',
            isPopular: true,
        },
        {
            id: 'game_blackjackclassic',
            title: 'Classic Blackjack',
            provider: 'NetEnt',
            categories: ['table-games', 'blackjack'],
            imageUrl: 'https://picsum.photos/seed/classicblackjack/300/200',
            description: 'The timeless casino card game, aim for 21 without going bust.',
            rtp: 99.59,
            volatility: 'Low',
        },
        {
            id: 'game_megamoolah',
            title: 'Mega Moolah',
            provider: 'Microgaming',
            categories: ['slots', 'jackpot', 'progressive'],
            imageUrl: 'https://picsum.photos/seed/megamoolah/300/200',
            description: 'Progressive jackpot slot with African wildlife theme and free spins.',
            rtp: 88.12,
            volatility: 'High',
            isPopular: true,
        },
        {
            id: 'game_gonzoquest',
            title: 'Gonzo\'s Quest',
            provider: 'NetEnt',
            categories: ['slots', 'adventure', 'medium-volatility'],
            imageUrl: 'https://picsum.photos/seed/gonzosquest/300/200',
            description: 'Join Gonzo on his quest for El Dorado with avalanche reels and multipliers.',
            rtp: 95.97,
            volatility: 'Medium',
        },
        {
            id: 'game_immortalromance',
            title: 'Immortal Romance',
            provider: 'Microgaming',
            categories: ['slots', 'vampire', 'high-volatility'],
            imageUrl: 'https://picsum.photos/seed/immortalromance/300/200',
            description: 'Gothic vampire-themed slot with multiple bonus features and free spins.',
            rtp: 96.86,
            volatility: 'High',
        },
        {
            id: 'game_bloodsuckers',
            title: 'Bloodsuckers',
            provider: 'NetEnt',
            categories: ['slots', 'vampire', 'low-volatility'],
            imageUrl: 'https://picsum.photos/seed/bloodsuckers/300/200',
            description: 'Vampire-themed slot with free spins and no wagering requirements.',
            rtp: 98.00,
            volatility: 'Low',
        },
        {
            id: 'game_cleopatra',
            title: 'Cleopatra',
            provider: 'IGT',
            categories: ['slots', 'egyptian', 'medium-volatility'],
            imageUrl: 'https://picsum.photos/seed/cleopatra/300/200',
            description: 'Ancient Egyptian slot with expanding wilds and free spins.',
            rtp: 95.02,
            volatility: 'Medium',
            isPopular: true,
        }
    ],
    promotions: [
        {
            id: 'promo_welcome',
            title: '100% Welcome Bonus + 50 Free Spins!',
            snippet: 'Double your first deposit up to $500 and get 50 free spins on Starburst!',
            fullTerms: 'Minimum deposit $20. Wagering requirements 35x bonus and free spins winnings. Free spins valid for 7 days. Maximum bonus $500. New players only. Terms and conditions apply.',
            imageUrl: 'https://picsum.photos/seed/welcomebonus/600/300',
            expiryDate: '2025-07-31',
        },
        {
            id: 'promo_reload',
            title: '50% Reload Bonus Every Tuesday',
            snippet: 'Get 50% bonus on your deposits every Tuesday, up to $200!',
            fullTerms: 'Minimum deposit $25. Wagering requirements 30x bonus. Valid every Tuesday. Maximum bonus $200. Existing players only. Cannot be combined with other offers.',
            imageUrl: 'https://picsum.photos/seed/reloadbonus/600/300',
            expiryDate: '2025-12-31',
        },
        {
            id: 'promo_cashback',
            title: '10% Weekly Cashback',
            snippet: 'Get 10% cashback on your weekly losses, no wagering requirements!',
            fullTerms: 'Cashback calculated on net losses from Monday to Sunday. Minimum loss $50 to qualify. Maximum cashback $500 per week. Paid every Monday. No wagering requirements.',
            imageUrl: 'https://picsum.photos/seed/cashback/600/300',
            expiryDate: '2025-12-31',
        },
        {
            id: 'promo_freespins',
            title: '100 Free Spins on Book of Dead',
            snippet: 'Get 100 free spins on Book of Dead with no deposit required!',
            fullTerms: 'No deposit required. Wagering requirements 50x free spins winnings. Free spins valid for 3 days. Maximum withdrawal from free spins $100. New players only.',
            imageUrl: 'https://picsum.photos/seed/freespins/600/300',
            expiryDate: '2025-08-15',
        },
        {
            id: 'promo_tournament',
            title: 'Weekly Slot Tournament - $10,000 Prize Pool',
            snippet: 'Compete in our weekly slot tournament for a chance to win from $10,000 prize pool!',
            fullTerms: 'Tournament runs from Monday to Sunday. Minimum bet $0.20 to qualify. Prize pool $10,000 distributed among top 100 players. Leaderboard updates every hour.',
            imageUrl: 'https://picsum.photos/seed/tournament/600/300',
            expiryDate: '2025-12-31',
        }
    ],
    casinoNews: [
        {
            id: 'news_bigwin',
            title: 'Lucky Player Hits Mega Jackpot on Mega Moolah!',
            snippet: 'A massive $5.4 million jackpot was just won on Mega Moolah by one of our lucky players.',
            fullContent: 'We are thrilled to announce that a new millionaire has been made on our platform! A lucky player from Canada has just hit the incredible Mega Jackpot on Mega Moolah, walking away with a life-changing $5.4 million. This marks the third major jackpot win on our platform this year, and we couldn\'t be happier for our players. The win occurred during a $2.50 spin, proving that big wins can happen to anyone at any time. Congratulations to our lucky winner!',
            date: '2025-06-20',
            tags: ['jackpot', 'big-win', 'mega-moolah'],
        },
        {
            id: 'news_newgames',
            title: 'New Games Added: 10 Exciting Slots Join Our Collection',
            snippet: 'We\'ve just added 10 brand new slot games from top providers including NetEnt and Microgaming.',
            fullContent: 'We\'re excited to announce the addition of 10 new slot games to our collection! This month\'s new releases include Starburst XXXtreme from NetEnt, Book of Dead from Play\'n GO, and several other high-quality titles. All new games feature stunning graphics, immersive soundtracks, and exciting bonus features. Players can now enjoy these games with our generous welcome bonus and regular promotions. Check out the new games in our slots section!',
            date: '2025-06-15',
            tags: ['new-games', 'slots', 'netent', 'microgaming'],
        },
        {
            id: 'news_mobile',
            title: 'Mobile App Update: Enhanced User Experience and New Features',
            snippet: 'Our mobile app has been updated with improved navigation, faster loading times, and new features.',
            fullContent: 'We\'re pleased to announce a major update to our mobile casino app! The new version includes improved navigation with a more intuitive interface, faster loading times for games and pages, and several new features including push notifications for promotions and jackpot alerts. The app now supports all our games and features, providing the same high-quality experience as our desktop platform. Download the latest version from the App Store or Google Play Store.',
            date: '2025-06-10',
            tags: ['mobile-app', 'update', 'user-experience'],
        },
        {
            id: 'news_security',
            title: 'Enhanced Security Measures: Protecting Your Gaming Experience',
            snippet: 'We\'ve implemented additional security measures to ensure the safety of all player accounts and transactions.',
            fullContent: 'Your security is our top priority. We\'ve recently implemented enhanced security measures including two-factor authentication, advanced encryption for all transactions, and improved fraud detection systems. These measures ensure that your personal information and funds are always protected. We also recommend enabling two-factor authentication on your account for an additional layer of security. Our commitment to player safety remains unwavering.',
            date: '2025-06-05',
            tags: ['security', 'two-factor-authentication', 'encryption'],
        },
        {
            id: 'news_promotions',
            title: 'Summer Promotions: Hot Deals and Cool Rewards',
            snippet: 'Get ready for our biggest summer promotion yet with daily bonuses, free spins, and cashback offers.',
            fullContent: 'Summer is here and so are our hottest promotions! Starting July 1st, we\'re launching our biggest summer campaign yet featuring daily deposit bonuses, free spins on popular slots, and enhanced cashback offers. Players can enjoy up to 200% deposit bonuses, 500 free spins, and 15% weekly cashback. The promotion runs until August 31st, giving players plenty of time to take advantage of these amazing offers. Don\'t miss out on the summer gaming fun!',
            date: '2025-06-01',
            tags: ['summer-promotions', 'bonuses', 'free-spins', 'cashback'],
        }
    ]
};
