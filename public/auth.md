# Auth.md

## Site: The Buggy Shop — Commercial & Luxury Utility Vehicles

## Agent Registration
No authentication required. All catalog, specification, and educational resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://DOMAIN.com/shop/ |
| Product Compare | https://DOMAIN.com/compare/ |
| Finance Calculator | https://DOMAIN.com/finance/ |
| Educational Blog | https://DOMAIN.com/blog/ |
| About & Heritage | https://DOMAIN.com/about/ |
| Contact & Support | https://DOMAIN.com/contact/ |

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
Orders are completed securely by a human customer via WhatsApp dispatch (+61 480 811 308) or the official order request form.
