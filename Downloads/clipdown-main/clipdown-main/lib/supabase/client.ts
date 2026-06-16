export function createBrowserClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
    },
  };
}
