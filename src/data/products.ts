import { supabase } from '../lib/supabase';
import type { Product } from '../types';

const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error.message, error.details, error.hint);
      throw error;
    }

    if (!data) {
      console.warn('No products found in database');
      return [];
    }

    return data.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image
    }));
  } catch (e) {
    console.error('Failed to fetch products:', e);
    throw e;
  }
};

export default getProducts;




