# Component Plan

## Shared Components

- `Navbar` — logo, nav links, logout(on profile and collection pages).
- `SneakerCard` — image, brand, model, status, price, edit/delete buttons
- `SneakerForm` — add and edit form (same fields, different submit action)
- `StatusPill` — owned / wanted / sold badge inside SneakerCard

## Page Components

- `HeroSection` — headline, subtext, CTA buttons (Landing)
- `FeatureCards` — react icons logo, name, purpose (Landing)
- `LoginForm` — email and password (Login)
- `RegisterForm` — username, email, password, confirm (maybe) (Register)
- `StatsRow` — owned count, total value, wanted count (Profile)

---

## State Location

| Component | State | Location |
|---|---|---|
| LoginForm / RegisterForm | Field inputs, errors | Local useState |
| SneakerForm | Field inputs | Local useState |
| Collection page | Sneakers array, active filter | Local useState |
| Navbar | Current user, logout | AuthContext |
| Profile | Stats (count/sum) | Computed from sneakers array |

---

## State Management

- **AuthContext** — user object, login/logout, token (global)
- **Local useState** — forms, sneaker list, filters (everything else)