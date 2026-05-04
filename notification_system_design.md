Objective
To identify and display the top 10 most important notifications based on priority and recency.
Approach
1.Data Fetching

Notifications are fetched using a API.
Authentication is done using a token.

2.Priority Assignment

Each notification type is assigned a priority:
Placement(3)
Result(2)
Event(1)

3.Sorting Logic
 1. Priority (descending)
 2. Timestamp

4.Top Selection

Only the top 10 notifications are selected using slicing.

Conclude:-
The system efficiently prioritizes and displays the most relevant notifications using a combination of weighted ranking and sorting.