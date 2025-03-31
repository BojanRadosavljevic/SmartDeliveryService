export const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1]; // Uzimamo payload deo JWT-a
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64)); // Dekodiramo payload u objekat
    } catch (error) {
      return null; // Ako token nije validan
    }
  };