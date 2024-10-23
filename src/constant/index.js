export const authenticatedRoutes = ['/dashboard', '/profile', '/top-up', '/history'];
export const unauthenticatedRoutes = ['/', '/login', '/register'];

// other
// /trip-tracking', '/scanner', '/success', 

export const transactionData = [
  { origin: "Makati", destination: "Taguig", fare: 50 },
  { origin: "Quezon City", destination: "Pasig", fare: 45 },
  { origin: "Manila", destination: "Parañaque", fare: 60 },
  { origin: "Mandaluyong", destination: "San Juan", fare: 40 },
  { origin: "Pasay", destination: "Caloocan", fare: 55 }
];

export const account = [
  {
    id: '12323124121241',
    fullname: "Pedro Cruz",
    balance: 1000
  },
  {
    id: '123231243123asdaw312',
    fullname: "Juan Dela Cruz",
    balance: 500
  }
]

export const plans = [
  {
    type: 'Basic',
    amount: 1000,
    benefits: [
      '10% bonus on every top-up',
      'No transaction fees for top-ups',
      'Access to wallet balance updates',
    ],
  },
  {
    type: 'Premium',
    amount: 2500,
    benefits: [
      '20% bonus on every top-up',
      'No transaction fees for top-ups',
      'Exclusive discounts at partner merchants',
    ],
  },
];