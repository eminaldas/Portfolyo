// Shared boot state: the preloader writes its progress here and the background
// network grows in step with it. `active` is true while the boot screen is up.
export const boot = { p: 0, active: true };
