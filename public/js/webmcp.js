(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search The Buggy Shop electric buggies by keyword, category, or max price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://DOMAIN.com/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse electric buggies by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/shop/${category}/` : `https://DOMAIN.com/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order for delivery across Australia. Human completes transaction.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const greeting = "Hi The Buggy Shop, ";
          const url = `https://wa.me/61480811308?text=${encodeURIComponent(greeting + (message || ''))}`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "compare_buggies",
        description: "Open the technical comparison matrix",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/compare/`;
          return { url: `https://DOMAIN.com/compare/` };
        }
      },
      {
        name: "contact",
        description: "Contact The Buggy Shop Queensland dispatch and sales desk",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/contact/`;
          return { url: `https://DOMAIN.com/contact/` };
        }
      }
    ]
  });
})();
