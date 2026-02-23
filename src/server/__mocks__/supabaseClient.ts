export const supabase = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      order: jest.fn(),
      insert: jest.fn(),
    })),
    delete: jest.fn(() => ({
      eq: jest.fn(() => Promise.resolve({ error: null })),
    })),
  })),
};
