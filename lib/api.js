// Base configuration
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const BLOG_BASE = process.env.NEXT_PUBLIC_API_BLOG_BASE_URL;
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

// Default pagination
const DEFAULT_PAGE = process.env.NEXT_PUBLIC_DEFAULT_PAGE || 1;
const DEFAULT_LIMIT = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || 20;

/**
 * Products API
 */

/**
 * Get all products
 * @returns {string} URL for fetching all products
 */
export const getAllProducts = () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTS;
  return `${API_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Get product details by ID
 * @param {string|number} productId - The product ID
 * @returns {string} URL for fetching product details
 */
export const getProductDetail = (productId) => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCT_DETAIL;
  return `${API_BASE}${endpoint}/${productId}`;
};

/**
 * Get products by category
 * @param {string|number} categoryId - The category ID
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 20)
 * @returns {string} URL for fetching category products
 */
export const getCategoryProducts = (
  categoryId,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT
) => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_CATEGORY_PRODUCTS;
  return `${API_BASE}${endpoint}/${categoryId}?page=${page}&limit=${limit}`;
};

/**
 * Get products by brand
 * @param {string|number} brandId - The brand ID (0 for all products)
 * @param {number} page - Page number (default: 1)
 * @returns {string} URL for fetching brand products
 */
export const getBrandProducts = (brandId = 0, page = DEFAULT_PAGE) => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BRAND_PRODUCTS;
  return `${API_BASE}${endpoint}/${brandId}/${STORE_ID}?page=${page}`;
};

/**
 * Special Collections API
 */

/**
 * Get best sellers
 * @returns {string} URL for fetching best sellers
 */
export const getBestSellers = () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_SELLERS;
  return `${API_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Get best deals
 * @returns {string} URL for fetching best deals
 */
export const getBestDeals = () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BEST_DEALS;
  return `${API_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Get new arrivals
 * @returns {string} URL for fetching new arrivals
 */
export const getNewArrivals = () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_NEW_ARRIVALS;
  return `${API_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Blog API
 */

/**
 * Get latest blog posts
 * @returns {string} URL for fetching blogs
 */
export const getBlogs = () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOGS;
  return `${BLOG_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Get blog details by slug or ID
 * @param {string|number} blogSlugOrId - The blog slug or ID
 * @returns {string} URL for fetching blog details
 */
export const getBlogDetail = (blogSlugOrId) => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BLOG_DETAIL || process.env.NEXT_PUBLIC_ENDPOINT_BLOGS;
  // If there's a specific blog detail endpoint, use it, otherwise append slug/ID to blogs endpoint
  if (process.env.NEXT_PUBLIC_ENDPOINT_BLOG_DETAIL) {
    return `${BLOG_BASE}${endpoint}/${blogSlugOrId}`;
  }
  // Fallback: try to get from blogs endpoint with slug/ID
  return `${BLOG_BASE}${endpoint}/${STORE_ID}/${blogSlugOrId}`;
};

/**
 * Category Helper Functions
 */

/**
 * Get category ID by name
 * @param {string} categoryName - The category name (kebab-case)
 * @returns {string} The category ID
 */
export const getCategoryId = (categoryName) => {
  const categoryMap = {
    "official-phone": process.env.NEXT_PUBLIC_CATEGORY_OFFICIAL_PHONE,
    "unofficial-phone": process.env.NEXT_PUBLIC_CATEGORY_UNOFFICIAL_PHONE,
    "smart-watches": process.env.NEXT_PUBLIC_CATEGORY_SMART_WATCHES,
    earbuds: process.env.NEXT_PUBLIC_CATEGORY_EARBUDS,
    headphones: process.env.NEXT_PUBLIC_CATEGORY_HEADPHONES,
    "cover-glass": process.env.NEXT_PUBLIC_CATEGORY_COVER_GLASS,
    gadgets: process.env.NEXT_PUBLIC_CATEGORY_GADGETS,
    neckband: process.env.NEXT_PUBLIC_CATEGORY_NECKBAND,
    fan: process.env.NEXT_PUBLIC_CATEGORY_FAN,
    powerbank: process.env.NEXT_PUBLIC_CATEGORY_POWERBANK,
    "charger-cable": process.env.NEXT_PUBLIC_CATEGORY_CHARGER_CABLE,
    "ipad-tablet": process.env.NEXT_PUBLIC_CATEGORY_IPAD_TABLET,
    speakers: process.env.NEXT_PUBLIC_CATEGORY_SPEAKERS,
    stylus: process.env.NEXT_PUBLIC_CATEGORY_STYLUS,
  };

  return categoryMap[categoryName];
};

/**
 * Get all categories with their IDs and metadata
 * @returns {Array} Array of category objects
 */
export const getAllCategories = () => {
  return [
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_OFFICIAL_PHONE,
      name: "Official Phone",
      slug: "official-phone",
      totalPages: 3,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_UNOFFICIAL_PHONE,
      name: "Unofficial Phone",
      slug: "unofficial-phone",
      totalPages: 4,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_SMART_WATCHES,
      name: "Smart Watches",
      slug: "smart-watches",
      totalPages: 7,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_EARBUDS,
      name: "EarBuds",
      slug: "earbuds",
      totalPages: 7,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_HEADPHONES,
      name: "Headphones",
      slug: "headphones",
      totalPages: 1,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_COVER_GLASS,
      name: "Cover & Glass",
      slug: "cover-glass",
      totalPages: 1,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_GADGETS,
      name: "Gadgets",
      slug: "gadgets",
      totalPages: 2,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_NECKBAND,
      name: "Neckband",
      slug: "neckband",
      totalPages: 3,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_FAN,
      name: "Fan",
      slug: "fan",
      totalPages: 2,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_POWERBANK,
      name: "Powerbank",
      slug: "powerbank",
      totalPages: 3,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_CHARGER_CABLE,
      name: "Charger & Cable",
      slug: "charger-cable",
      totalPages: 4,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_IPAD_TABLET,
      name: "iPad & Tablet",
      slug: "ipad-tablet",
      totalPages: 2,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_SPEAKERS,
      name: "Speakers",
      slug: "speakers",
      totalPages: 3,
    },
    {
      id: process.env.NEXT_PUBLIC_CATEGORY_STYLUS,
      name: "Stylus",
      slug: "stylus",
      totalPages: 1,
    },
  ];
};

/**
 * Fetch Helper Functions
 * Convenient wrappers with built-in error handling
 */

/**
 * Fetch data with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} The response data
 */
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      // Cache for 10 minutes (600 seconds)
      // next: { revalidate: 600 },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Fetch all products (with error handling)
 * @returns {Promise} Products data
 */
export const fetchAllProducts = async () => {
  const url = getAllProducts();
  return fetchData(url);
};

/**
 * Fetch product details (with error handling)
 * Optimized for faster loading with shorter cache time
 * @param {string|number} productId - The product ID
 * @returns {Promise} Product details data
 */
export const fetchProductDetail = async (productId) => {
  const url = getProductDetail(productId);
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      // Short cache (30 seconds) for balance between freshness and performance
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch product detail error:", error);
    throw error;
  }
};

/**
 * Fetch category products (with error handling)
 * @param {string|number} categoryId - The category ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise} Category products data
 */
export const fetchCategoryProducts = async (
  categoryId,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT
) => {
  const url = getCategoryProducts(categoryId, page, limit);
  return fetchData(url);
};

/**
 * Fetch brand products (with error handling)
 * @param {string|number} brandId - The brand ID
 * @param {number} page - Page number
 * @returns {Promise} Brand products data
 */
export const fetchBrandProducts = async (brandId, page = DEFAULT_PAGE) => {
  const url = getBrandProducts(brandId, page);
  return fetchData(url);
};

/**
 * Fetch best sellers (with error handling)
 * @returns {Promise} Best sellers data
 */
export const fetchBestSellers = async () => {
  const url = getBestSellers();
  return fetchData(url);
};

/**
 * Fetch best deals (with error handling)
 * @returns {Promise} Best deals data
 */
export const fetchBestDeals = async () => {
  const url = getBestDeals();
  return fetchData(url);
};

/**
 * Fetch new arrivals (with error handling)
 * @returns {Promise} New arrivals data
 */
export const fetchNewArrivals = async () => {
  const url = getNewArrivals();
  return fetchData(url);
};

/**
 * Fetch blogs (with error handling)
 * @returns {Promise} Blogs data
 */
export const fetchBlogs = async () => {
  const url = getBlogs();
  return fetchData(url);
};

/**
 * Fetch blog details by slug or ID (with error handling)
 * @param {string|number} blogSlugOrId - The blog slug or ID
 * @returns {Promise} Blog details data
 */
export const fetchBlogDetail = async (blogSlugOrId) => {
  const url = getBlogDetail(blogSlugOrId);
  return fetchData(url);
};

/**
 * Sliders API
 */

/**
 * Get sliders endpoint
 * @returns {string} URL for fetching sliders
 */
export const getSliders = () => {
  const slidersUrl = process.env.NEXT_PUBLIC_SLIDERS;
  
  if (!slidersUrl) {
    console.error('NEXT_PUBLIC_SLIDERS is not configured in your .env file');
    return '';
  }
  
  return slidersUrl;
};

/**
 * Fetch sliders (with error handling)
 * @returns {Promise} Sliders data
 */
export const fetchSliders = async () => {
  const url = getSliders();
  return fetchData(url);
};

/**
 * Banners API
 */

/**
 * Get banners endpoint
 * @returns {string} URL for fetching banners
 */
export const getBanners = () => {
  const bannersUrl = process.env.NEXT_PUBLIC_BANNERS;
  
  if (!bannersUrl) {
    console.error('NEXT_PUBLIC_BANNERS is not configured in your .env file');
    return '';
  }
  
  return bannersUrl;
};

/**
 * Fetch banners (with error handling)
 * @returns {Promise} Banners data
 */
export const fetchBanners = async () => {
  const url = getBanners();
  return fetchData(url);
};

/**
 * Search API
 */

/**
 * Search products
 * @param {string} query - The search query
 * @param {number} limit - Maximum number of results (default: 10)
 * @returns {string} URL for searching products
 */
export const getSearchProducts = (query, limit = 10) => {
  // If there's a dedicated search endpoint, use it
  // Otherwise, we'll use getAllProducts and filter client-side
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_SEARCH || process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTS;
  if (process.env.NEXT_PUBLIC_ENDPOINT_SEARCH) {
    return `${API_BASE}${endpoint}?q=${encodeURIComponent(query)}&store_id=${STORE_ID}&limit=${limit}`;
  }
  // Fallback to products endpoint (will be filtered client-side)
  return `${API_BASE}${endpoint}/${STORE_ID}`;
};

/**
 * Fetch search results (with error handling)
 * Note: If no dedicated search endpoint exists, this returns all products
 * and filtering should be done client-side
 * @param {string} query - The search query
 * @param {number} limit - Maximum number of results
 * @returns {Promise} Search results data
 */
export const fetchSearchProducts = async (query, limit = 10) => {
  const url = getSearchProducts(query, limit);
  return fetchData(url);
};

/**
 * Categories API
 */

/**
 * Get categories endpoint
 * @returns {string} URL for fetching categories
 */
export const getCategories = () => {
  const categoriesUrl = process.env.NEXT_PUBLIC_CATEGORIES;
  
  if (!categoriesUrl) {
    console.error('NEXT_PUBLIC_CATEGORIES is not configured in your .env file');
    return '';
  }
  
  return categoriesUrl;
};

/**
 * Fetch categories (with error handling)
 * @returns {Promise} Categories data
 */
export const fetchCategories = async () => {
  const url = getCategories();
  return fetchData(url);
};

