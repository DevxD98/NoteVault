// Database configuration
export const DB_CONFIG = {
  uri: 'mongodb://localhost:27017/auth_db',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
} as const;