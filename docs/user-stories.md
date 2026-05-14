# Sneaker Collection App - User Stories

---

## Authenication

### Story 1: Register an Account

As a sneaker collection user,
I want to create an account with a username, email, and password, 
So that I can have a private space to track my unique collection  

Acceptance Criteria:

- [ ] Form accepts username, email, password, and confirm password
- [ ] Username must be 3-20 alphanumeric characters
- [ ] Password must be at least 8 characters and hashed with bcrypt (10 salt rounds)
- [ ] Duplicate email or username returns a clear error message
- [ ] Successful registration redirction to the login page

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend) 
Estimated Time: 4 hour  
Status: Not Started  

---

### Story 2: Log Into My Account

As a registered sneaker collection user,
I want to log in with an email and password,
So that I can access my personal sneaker collection

Acceptance Criteria:

- [ ] Login form accepts email and password
- [ ] Returns a JWT token on successful login, stored in localStorage
- [ ] Wrong credentials displays a clear error message
- [ ] Successful login redirects to the Collection page (protected)
- [ ] User stays logged in across browser sessions

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend) 
Estimated Time: 3 hour  
Status: Not Started  

---

### Story 3: Protect My Collection Routes

As a sneaker collection,
I want my collection to be inaccessible to anyone who isn't logged in,
So that my data stays private.

Acceptance Criteria:

- [ ] Auth middleware verifies JWT token on all sneaker routes
- [ ] Frontend ProtectedRoute redirects to /login if no toke is available
- [ ] Collection and Profile pages only accessible when authenicated
- [ ] Navbar shows correct links based on auth status

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend)  
Estimated Time: 3 hour  
Status: Not Started

--- 

## CRUD - Sneaker Collection

### Story 4: Add a Sneaker

As a sneaker collector,
I want to add a sneaker with details like brand, model, size, and status,
So that I can log every pair in my collection.

Acceptance Criteria:
- [ ] Modal form accepts brand, model, size, status, purchase price, current value, condition, and notes
- [ ] Brand, model, size, and status are required — inline errors shown if missing
- [ ] Status must be owned, wanted, or sold
- [ ] Sneaker saved to database linked to the logged-in user
- [ ] New sneaker card appears in the grid immediately after submission

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend)  
Estimated Time: 5 hours  
Status: Not Started

---

### Story 5: View My Collection

As a sneaker collector,
I want to see all my sneakers displayed as cards on the Collection page,
So that I can browse everything I own, want, and have sold.

Acceptance Criteria:
- [ ] Collection page fetches sneakers from the API on load
- [ ] Each card shows brand, model, status pill, and price
- [ ] Loading spinner shown while fetching
- [ ] Empty state shown with a prompt to add first sneaker
- [ ] Grid is responsive on mobile and desktop

Priority: `High`  
Sprint: 2  
Estimated Time: 4 hours  
Status: Not Started

---

### Story 6: Edit a Sneaker

As a sneaker collector,
I want to update a sneaker's details from its card,
So that I can keep prices and condition accurate over time.

Acceptance Criteria:
- [ ] Edit button opens the form pre-filled with the sneaker's existing data
- [ ] All fields are editable and submit to PUT /api/sneakers/:id
- [ ] Returns 403 if sneaker belongs to a different user
- [ ] Updated card reflects changes immediately without a page reload
- [ ] Cancel closes the modal without saving

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend)  
Estimated Time: 4 hours  
Status: Not Started 

---

### Story 7: Delete a Sneaker

As a sneaker collector,
I want to delete a sneaker from my collection with a confirmation step,
So that I don't accidentally remove a pair I want to keep.

Acceptance Criteria:
- [ ] Confirmed deletion sends DELETE to /api/sneakers/:id
- [ ] Returns 403 if sneaker belongs to a different user
- [ ] Sneaker card removed from the grid immediately after deletion
- [ ] Error message shown if the request fails

Priority: `High`  
Sprint: 1 (Backend) & 2 (Frontend)  
Estimated Time: 3 hours  
Status: Not Started

---

## Core Features

### Story 8: Filter Collection by Status

As a sneaker collector,
I want to filter my collection by owned, wanted, or sold,
So that I can quickly focus on one part of my collection.

Acceptance Criteria:
- [ ] Filter pills (All, Owned, Wanted, Sold) shown above the sneaker grid
- [ ] Clicking a pill filters cards client-side with no extra API call
- [ ] Active pill highlighted in blue
- [ ] Count updates to reflect the active filter

Priority: `High`  
Sprint: 2  
Estimated Time: 2 hours  
Status: Not Started

---

### Story 9: View Profile and Collection Stats

As a sneaker collector,
I want to see my profile alongside a summary of my collection,
So that I can get a quick snapshot of my portfolio.

Acceptance Criteria:
- [ ] Profile page shows username and email from the API
- [ ] Stats row shows owned count, total collection value, and wanted count
- [ ] Total value calculated client-side from owned sneakers' current value
- [ ] Page redirects to login if not authenticated

Priority: `Medium`  
Sprint: 2  
Estimated Time: 3 hours  
Status: Not Started

---

### Story 10: Log Out

As a sneaker collector,
I want to log out of The Laboratory,
So that my collection is secure when I step away.

Acceptance Criteria:
- [ ] Logout button visible in the navbar when logged in
- [ ] Clears JWT token from localStorage and resets AuthContext
- [ ] Redirects to the Landing page
- [ ] Collection and Profile pages become inaccessible immediately

Priority: `Medium`  
Sprint: 2  
Estimated Time: 1 hour  
Status: Not Started
