// Home Page Static Data
import Hyluronicacid from '../assets/Hyluronicacid.png';
import Salicylic from '../assets/salicylic-acid-banner.jpg';
import coconut from '../assets/coconut.jpg';
import shea from '../assets/shea.webp';
import neem from '../assets/neem.jpg';
import aloe from '../assets/aloe.jpg';
import antiage from '../assets/antiage.jpg';
import hyper from '../assets/hyper.avif';
import oily from '../assets/oily.webp';
import Dry from '../assets/dry.webp';
import acne from '../assets/acne.png';
import dryhair from '../assets/dryhair.webp';
import frizzy from '../assets/frizzy.webp';
import curl from '../assets/curl.webp';
import damage from '../assets/damage.avif';
import Makeup from '../assets/makeup.webp';

export const homeData = {
  hero: {
    eyebrow: "Welcome to the Glam Street",
    headline: "Own Your Glam. Own Your Confidence.",
    subheadline: "Your one-stop destination for Indian women's beauty. Discover products that don't just make you look good, they make you feel unstoppable.",
    cta: {
      primary: { label: "Explore Products", href: "/shop" },
      secondary: { label: "Discover Your Routine", href: "/routines" }
    },
    heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop&q=80",
    altText: "Beautiful Indian woman with glowing skin"
  }
};


export const ingredientsData = [
  {
    name: 'Hyaluronic Acid',
    image: Hyluronicacid,
    filter: 'Hyaluronic Acid'
  },
  {
    name: 'Salicylic Acid',
    image: Salicylic,
    filter: 'Salicylic Acid'
  },
  {
    name: 'Coconut Oil',
    image: coconut,
    filter: 'Coconut Oil'
  },
  {
    name: 'Shea Butter',
    image: shea,
    filter: 'Shea Butter'
  },
  {
    name: 'Neem Extract',
    image: neem,
    filter: 'Neem Extract'
  },
  {
    name: 'Aloe Vera',
    image: aloe,
    filter: 'Aloe Vera'
  }
];

export const skinConcernsData = [
  {
    name: 'Acne',
    image: acne,
    filter: 'Acne'
  },
  {
    name: 'Anti-aging',
    image: antiage,
    filter: 'Anti-aging'
  },
  {
    name: 'Hyperpigmentation',
    image: hyper,
    filter: 'Hyperpigmentation'
  },
  {
    name: 'Dryness',
    image: Dry,
    filter: 'Dryness'
  },
  {
    name: 'Oil control',
    image: oily,
    filter: 'Oil control'
  },
  {
    name: 'Acne',
    image: acne,
    filter: 'Acne'
  }
];

export const hairConcernsData = [
  {
    name: 'Curl definition',
    image: curl,
    filter: 'Curl definition'
  },
  {
    name: 'Damage repair',
    image: damage,
    filter: 'Damage repair'
  },
  {
    name: 'Dry hair',
    image: dryhair,
    filter: 'Dry hair'
  },
  {
    name: 'Frizz',
    image: frizzy,
    filter: 'Frizz'
  },
  {
    name: 'Curl definition',
    image: curl,
    filter: 'Curl definition'
  },
  {
    name: 'Damage repair',
    image: damage,
    filter: 'Damage repair'
  }
];

export const categoriesData = [
  {
    name: 'Skincare',
    image: Hyluronicacid,
    description: 'Discover nourishing products for radiant skin.',
    filter: 'skincare'
  },
  {
    name: 'Haircare',
    image: dryhair,
    description: 'Transform your hair with our premium care solutions.',
    filter: 'haircare'
  },
  {
    name: 'MakeUp',
    image: Makeup,
    description: 'Enhance your beauty with our stunning makeup collection.',
    filter: 'makeup'
  }
];

export const statsData = [
  {
    value: '100+',
    label: 'Happy Customers'
  },
  {
    value: '200+',
    label: 'Products'
  },
  {
    value: '100+',
    label: 'Natural Ingredients'
  }
];