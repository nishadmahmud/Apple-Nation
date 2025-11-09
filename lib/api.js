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
 * @param {string|number} brandId - The brand ID
 * @param {number} page - Page number (default: 1)
 * @returns {string} URL for fetching brand products
 */
export const getBrandProducts = (brandId, page = DEFAULT_PAGE) => {
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
      next: { revalidate: 600 },
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
 * @param {string|number} productId - The product ID
 * @returns {Promise} Product details data
 */
export const fetchProductDetail = async (productId) => {
  const url = getProductDetail(productId);
  return fetchData(url);
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

