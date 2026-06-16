export function createServerClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
  };
}
