// lib/adminAuth.js
// Passcode authentication for Reply Portal admin routes per WebForge v11.1
// Server-side only — never expose ADMIN_PASSCODE to client

export function checkAdminPasscode(request) {
  const adminPasscode = process.env.ADMIN_PASSCODE || 'orderreply';

  const providedPasscode = request.headers.get('x-admin-passcode');

  if (!providedPasscode || providedPasscode !== adminPasscode) {
    return Response.json(
      { error: 'Invalid or missing administrator passcode.' },
      { status: 401 }
    );
  }

  return null; // OK
}
