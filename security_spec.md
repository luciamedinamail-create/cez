# Security Specification - CEZ Studio

## Data Invariants
- A `Project` must have a title, category, year, location, and a hero image.
- A `News` article must have a date, category, title, and description.
- Only users with the `admin` or `client` role (verified via `users` collection) can create or update `Project` and `News` documents.
- User profiles can only be read by the owner or an admin.
- Projects and News are publicly readable.

## The Dirty Dozen Payloads (Rejection Targets)
1. Creating a project without a title.
2. Updating a project's `heroImage` with a non-string value.
3. A non-authenticated user attempting to create a news article.
4. An authenticated user without `client`/`admin` role attempting to delete a project.
5. Spoofing `createdAt` with a client-side timestamp instead of `request.time`.
6. Injecting a 2MB string into a project description.
7. Modifying a user profile that doesn't belong to the authenticated user.
8. Updating a project and trying to change its `id`.
9. Creating a news article with a future date (if we enforced that, but let's stick to basic schema).
10. Adding a hidden field `isVerified: true` to a project.
11. An authenticated user changing their own role to `admin` in the `users` collection.
12. Attempting to batch-delete all projects as a guest.

## Tests (Conceptual)
All the above must return `PERMISSION_DENIED`.
