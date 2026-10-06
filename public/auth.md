# Auth.md

## Site: The Buggy Shop — Commercial & Luxury Utility Vehicles

## Agent Registration
No authentication required. All catalog, specification, and educational resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://thebuggyshoppty.com.au/shop/ |
| Product Compare | https://thebuggyshoppty.com.au/compare/ |
| Finance Calculator | https://thebuggyshoppty.com.au/finance/ |
| Educational Blog | https://thebuggyshoppty.com.au/blog/ |
| About & Heritage | https://thebuggyshoppty.com.au/about/ |
| Contact & Support | https://thebuggyshoppty.com.au/contact/ |
| FAQ | https://thebuggyshoppty.com.au/faq/ |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse catalog items, perform comparison queries, and prepare order drafts via the MCP server.
Orders are completed securely by a human customer via WhatsApp dispatch (0480 811 308) or the official order request form.
