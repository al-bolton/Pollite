declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_MAPS_API_KEY: string;
      RAPIDAPI_TRAVEL_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }