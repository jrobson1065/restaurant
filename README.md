# Objective:
  ## Create a platform for your restaruant that allows a user to make and modify reservations.

# Code Requirements:
  - [ ] There should only ever be 1 instance of your restaurant. Include logic that prevents creating a second restaurant. (Singleton Pattern)
  - [ ] Allow guests to get an alert 1 hour before their scheduled reservation. (Observer Pattern)
  - [ ] Your code should follow the single-responsibility principle of the SOLID methodology and should follow the inheritance and encapsulation pillars of APIE (OOP).


# Functionality Requirements:
  - [ ] Should be able to create a new reservation, edit a reservation, and delete a reservation.
  - [ ] You should know how many customers you can accommodate at once. Do not allow reservations to exceed your max capacity.
  - [ ] Each reservation should have a 1 hour time slot (for simplicity).
  - [ ] Your restaurant should be closed at least 1 day a week.
  - [ ] Your restaurant should have normal hours (you can pick your own hours).
  - [ ] Your restaurant should have extended hours as well. (see example below)

# Example Restaurant Hours:
  - Mon: closed
  - Tues: 5pm - 10pm  (normal hours)
  - Wed: 5pm - 10pm  (normal hours)
  - Thu: 5pm - 10pm  (normal hours)
  - Fri: 5pm - 12am  (extended hours)
  - Sat: 5pm - 12am  (extended hours)
  - Sun: 5pm - 10pm  (normal hours)

# Example Directory:
```
restaurant/
  js/
    helperClasses/
      calendarHelper.js
      observerHelper.js
      singletonHelper.js
      tableHelper.js
    app.js
    library.js (optional)
    restaurant.js
  index.html
  ```
    

# Assumptions:
  - Assume that all reservations will start and end exactly as scheduled. We will assume no customers are late.
  - Assume that we are open on holidays during normal business hours (whatever you set in your restaurant hours).
  - Assume that you will not have any walk-in guests - all guests must make a reservation.
  - Assume that every guest will have exactly the number of people listed in the reservation (no extra people, no missing people).
