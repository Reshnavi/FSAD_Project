export const mockUsers = [
  { id: 1, name: 'John Farmer', email: 'farmer@farm.com', password: '123', role: 'farmer',
    farmName: 'Green Valley Farm', location: 'California, USA', rating: 4.8 },
  { id: 2, name: 'Jane Buyer', email: 'buyer@email.com', password: '123', role: 'buyer',
    location: 'New York, USA' },
  { id: 3, name: 'Admin', email: 'admin@farm.com', password: '123', role: 'admin' }
];

// emoji field is used as a reliable fallback image
export let mockProducts = [
  {
    id: 1, name: 'Organic Honey', price: 25.99, unit: '500g jar',
    category: 'Organic', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🍯',
    image: 'https://thumbs.dreamstime.com/b/honey-jars-17040432.jpg',
    stock: 50, rating: 4.8, reviews: 24,
    description: 'Pure organic honey harvested from local beehives. Rich in antioxidants and natural sweetness.'
  },
  {
    id: 2, name: 'Strawberry Jam', price: 8.99, unit: '300g jar',
    category: 'Processed Foods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🍓',
    image: 'https://th.bing.com/th/id/OIP.RTmRIYSNzDoCGl_4cuj9GQHaHa?w=183&h=183&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3',
    stock: 100, rating: 4.6, reviews: 18,
    description: 'Handmade jam from freshly picked strawberries. No preservatives, just pure fruit goodness.'
  },
  {
    id: 3, name: 'Extra Virgin Olive Oil', price: 35.99, unit: '1L bottle',
    category: 'Processed Foods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🫒',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    stock: 30, rating: 4.9, reviews: 32,
    description: 'Cold-pressed from hand-picked organic olives. Perfect for cooking and salad dressings.'
  },
  {
    id: 4, name: 'Artisan Bread', price: 6.99, unit: 'Loaf',
    category: 'Baked Goods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🍞',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    stock: 25, rating: 4.7, reviews: 15,
    description: 'Fresh baked daily using organic whole wheat flour. Crispy crust, soft inside.'
  },
  {
    id: 5, name: 'Organic Coffee Beans', price: 18.99, unit: '500g bag',
    category: 'Beverages', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '☕',
    image: 'https://th.bing.com/th/id/OIP.jktOyZjTO_Q33cjeOcL4AgHaE7?w=269&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3',
    stock: 80, rating: 4.5, reviews: 42,
    description: 'Fair trade organic coffee beans from high-altitude farms. Rich aroma and bold flavor.'
  },
  {
    id: 6, name: 'Handmade Soap', price: 12.99, unit: '100g bar',
    category: 'Handmade Goods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🧼',
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400',
    stock: 200, rating: 4.9, reviews: 56,
    description: 'Natural handmade soap with essential oils and herbs. Gentle on skin, no chemicals.'
  },
  {
    id: 7, name: 'Fresh Goat Cheese', price: 14.99, unit: '200g pack',
    category: 'Dairy', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
    stock: 40, rating: 4.7, reviews: 21,
    description: 'Creamy fresh goat cheese from pasture-raised goats. Perfect for salads and toast.'
  },
  {
    id: 8, name: 'Dried Mango Slices', price: 9.99, unit: '250g pack',
    category: 'Processed Foods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🥭',
    image: 'https://tse2.mm.bing.net/th/id/OIP.AfaSZNNrfgn1ASPFsrfWCgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    stock: 120, rating: 4.4, reviews: 33,
    description: 'Sun-dried mango slices with no added sugar. Sweet, chewy and packed with vitamins.'
  },
  {
    id: 9, name: 'Herbal Green Tea', price: 11.99, unit: '100g pack',
    category: 'Beverages', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🍵',
    image: 'https://th.bing.com/th/id/OIP.nCHx2C1k0fKgDXGRl5H_gQHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.8&pid=1.7&rm=3',
    stock: 90, rating: 4.6, reviews: 28,
    description: 'Organic green tea blended with fresh herbs. Calming, antioxidant-rich and refreshing.'
  },
  {
    id: 10, name: 'Beeswax Candles', price: 16.99, unit: 'Set of 3',
    category: 'Handmade Goods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🕯️',
    image: 'https://tse3.mm.bing.net/th/id/OIP.dl1QwOkB0wOf1DSnEfh0SQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    stock: 60, rating: 4.8, reviews: 19,
    description: 'Hand-poured pure beeswax candles with natural cotton wicks. Clean burn, honey scent.'
  },
  {
    id: 11, name: 'Whole Grain Cookies', price: 7.99, unit: '300g box',
    category: 'Baked Goods', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🍪',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    stock: 75, rating: 4.5, reviews: 41,
    description: 'Crunchy whole grain cookies baked with oats, nuts and natural sweeteners.'
  },
  {
    id: 12, name: 'Farm Fresh Eggs', price: 5.99, unit: 'Dozen',
    category: 'Fresh Produce', farmerId: 1, farmerName: 'John Farmer', farmName: 'Green Valley Farm',
    emoji: '🥚',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    stock: 150, rating: 4.9, reviews: 67,
    description: 'Free-range farm fresh eggs from happy hens. Rich golden yolks, full of nutrition.'
  },
];

export let mockOrders = [
  {
    id: 1, buyerId: 2, buyerName: 'Jane Buyer',
    items: [{ ...mockProducts[0], quantity: 2 }, { ...mockProducts[1], quantity: 1 }],
    total: 60.97, status: 'delivered', date: '2024-01-15', farmerId: 1
  },
  {
    id: 2, buyerId: 2, buyerName: 'Jane Buyer',
    items: [{ ...mockProducts[2], quantity: 1 }],
    total: 35.99, status: 'shipped', date: '2024-01-18', farmerId: 1
  },
  {
    id: 3, buyerId: 2, buyerName: 'Jane Buyer',
    items: [{ ...mockProducts[3], quantity: 1 }, { ...mockProducts[4], quantity: 2 }],
    total: 44.97, status: 'pending', date: '2024-01-20', farmerId: 1
  },
];

export const categories = [
  'All', 'Processed Foods', 'Baked Goods', 'Beverages',
  'Handmade Goods', 'Dairy', 'Fresh Produce'
];
